import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { orders, orderItems } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { sendCustomerOrderStatusEmail } from "@/lib/mail";

// Initialize Stripe only if secret key is available
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, { apiVersion: "2026-10-28.endive" }) : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe not configured. Please set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET." },
      { status: 503 }
    );
  }

  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutExpired(session);
        break;
      }
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSucceeded(paymentIntent);
        break;
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailed(paymentIntent);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.order_id;
  const paymentMethod = session.payment_method_types?.[0] || "card";

  if (!orderId) {
    console.error("No order_id in session metadata");
    return;
  }

  console.log(`✅ Stripe checkout completed for order ${orderId}`);

  try {
    // Update order status to paid
    await db
      .update(orders)
      .set({
        status: "paid",
        paymentMethod: "stripe",
        paymentReference: session.payment_intent as string,
        paidAt: new Date().toISOString(),
      })
      .where(eq(orders.id, orderId));

    // Fetch order details for email
    const [order] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
    if (!order) return;

    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));

    // Send confirmation email to customer
    await sendCustomerOrderStatusEmail({
      order: {
        id: order.id,
        firstName: order.firstName,
        lastName: order.lastName,
        email: order.email,
        country: order.country,
        streetAddress: order.streetAddress,
        grandTotal: order.grandTotal,
      },
      newStatus: "paid",
      items: items.map((item) => ({
        title: item.title,
        category: item.category,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
    });

    console.log(`📧 Payment confirmation email sent for order ${orderId}`);
  } catch (error) {
    console.error(`Error updating order ${orderId} after payment:`, error);
  }
}

async function handleCheckoutExpired(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.order_id;
  if (!orderId) return;

  console.log(`⏰ Stripe checkout expired for order ${orderId}`);

  // Optionally update order status or send reminder
  // await db.update(orders).set({ status: "expired" }).where(eq(orders.id, orderId));
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const orderId = paymentIntent.metadata?.order_id;
  if (!orderId) return;

  console.log(`💰 Payment succeeded for order ${orderId} (PI: ${paymentIntent.id})`);
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  const orderId = paymentIntent.metadata?.order_id;
  if (!orderId) return;

  console.log(`❌ Payment failed for order ${orderId} (PI: ${paymentIntent.id})`);

  // Update order status
  try {
    await db
      .update(orders)
      .set({ status: "pending" }) // Keep as pending for retry
      .where(eq(orders.id, orderId));
  } catch (error) {
    console.error(`Error updating order ${orderId} after failed payment:`, error);
  }
}
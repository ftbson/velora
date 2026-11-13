import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders } from "@/lib/schema";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, { apiVersion: "2026-10-28.endive" }) : null;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.veloras.ch";

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe not configured. Please set STRIPE_SECRET_KEY." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { orderId, paymentMethod } = body; // paymentMethod: "card" | "twint"

    if (!orderId) {
      return NextResponse.json({ error: "Order ID required" }, { status: 400 });
    }

    // Fetch order
    const [order] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status !== "pending") {
      return NextResponse.json({ error: "Order already processed" }, { status: 400 });
    }

    // Verify user owns this order (or is admin)
    const user = await getAuthenticatedUser();
    if (user && order.userId !== user.id) {
      // Check if admin
      const { isAdminAuthenticated } = await import("@/lib/auth");
      const isAdmin = await isAdminAuthenticated();
      if (!isAdmin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "chf",
            product_data: {
              name: `Bestellung ${order.id}`,
              description: `${order.firstName} ${order.lastName} - VELORA`,
            },
            unit_amount: Math.round(order.grandTotal * 100), // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        order_id: order.id,
      },
      success_url: `${siteUrl}/konto/bestellungen/${order.id}?payment=success`,
      cancel_url: `${siteUrl}/konto/bestellungen/${order.id}?payment=cancelled`,
      customer_email: order.email,
      locale: "de",
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["CH", "LI"],
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe session creation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
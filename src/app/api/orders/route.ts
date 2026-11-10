import { randomUUID } from "node:crypto";
import { desc, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";
import {
  getAuthenticatedUser,
  isAdminAuthenticated,
  isRateLimited,
  isSameOriginRequest,
} from "@/lib/auth";
import { db } from "@/lib/db";
import { orderItems, orders } from "@/lib/schema";
import { sendMail } from "@/lib/mail";
import { productsData } from "@/data/products";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// Create an order from catalog prices, never from client-provided totals.
export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 403 });
  }

  try {
    const body: unknown = await request.json();
    if (!isRecord(body) || !isRecord(body.customer) || !Array.isArray(body.items)) {
      return NextResponse.json({ error: "Ungültige Bestelldaten." }, { status: 400 });
    }

    const customer = body.customer;
    const firstName = typeof customer.firstName === "string" ? customer.firstName.trim() : "";
    const lastName = typeof customer.lastName === "string" ? customer.lastName.trim() : "";
    const country = typeof customer.country === "string" ? customer.country.trim() : "";
    const street = typeof customer.streetAddress === "string" ? customer.streetAddress.trim() : "";
    const postalCode = typeof customer.postalCode === "string" ? customer.postalCode.trim() : "";
    const city = typeof customer.city === "string" ? customer.city.trim() : "";
    const streetAddress = `${street}, ${postalCode} ${city}`;
    const whatsapp = typeof customer.whatsapp === "string" ? customer.whatsapp.trim() : "";
    const email = typeof customer.email === "string" ? customer.email.trim().toLowerCase() : "";

    if (
      !firstName ||
      firstName.length > 100 ||
      !lastName ||
      lastName.length > 100 ||
      !country ||
      country.length > 100 ||
      !street ||
      street.length > 200 ||
      !postalCode ||
      postalCode.length > 20 ||
      !city ||
      city.length > 100 ||
      !whatsapp ||
      whatsapp.length > 40 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 254
    ) {
      return NextResponse.json(
        { error: "Bitte überprüfen Sie Ihre Kontakt- und Lieferdaten." },
        { status: 400 },
      );
    }
    if (body.items.length === 0 || body.items.length > 40) {
      return NextResponse.json({ error: "Der Warenkorb ist leer oder ungültig." }, { status: 400 });
    }

    const quantities = new Map<string, number>();
    for (const rawItem of body.items) {
      if (
        !isRecord(rawItem) ||
        typeof rawItem.id !== "string" ||
        typeof rawItem.quantity !== "number" ||
        !Number.isInteger(rawItem.quantity)
      ) {
        return NextResponse.json({ error: "Ungültige Produktangaben." }, { status: 400 });
      }

      const quantity = (quantities.get(rawItem.id) ?? 0) + rawItem.quantity;
      const product = productsData.find((candidate) => candidate.id === rawItem.id);
      if (product?.isDraft) {
        return NextResponse.json(
          { error: "Dieses Produkt ist noch nicht verfügbar." },
          { status: 409 },
        );
      }
      if (!product || quantity > 99 || quantity < 1) {
        return NextResponse.json({ error: "Ungültiges Produkt oder ungültige Menge." }, { status: 400 });
      }
      quantities.set(rawItem.id, quantity);
    }

    const items = [...quantities.entries()].map(([id, quantity]) => {
      const product = productsData.find((candidate) => candidate.id === id);
      if (!product) throw new Error("Validated catalog product could not be found.");
      return {
        productId: product.id,
        title: product.title,
        category: product.category,
        quantity,
        unitPrice: product.price,
      };
    });

    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const shippingCost = 0;
    const grandTotal = subtotal + shippingCost;
    const customerSession = await getAuthenticatedUser();
    const orderEmail = customerSession?.email ?? email;
    if (await isRateLimited("order", orderEmail, 5, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Zu viele Bestellungen in kurzer Zeit. Bitte kontaktieren Sie uns." },
        { status: 429 },
      );
    }

    const orderId = `ORD-${randomUUID()}`;
    const createdAt = new Date().toISOString();

    await db.transaction(async (tx) => {
      await tx.insert(orders).values({
        id: orderId,
        firstName,
        lastName,
        country,
        streetAddress,
        whatsapp,
        email: orderEmail,
        userId: customerSession?.id ?? null,
        subtotal,
        shippingCost,
        grandTotal,
        status: "pending",
        createdAt,
      });

      await tx.insert(orderItems).values(
        items.map((item) => ({
          id: randomUUID(),
          orderId,
          ...item,
        })),
      );
    });

    let emailNotificationSent = true;
    try {
      await sendMail({
        subject: `[VELORA-Bestellung] ${orderId} - ${firstName} ${lastName}`,
        replyTo: orderEmail,
        text: [
          "Neue VELORA-Bestellung",
          "",
          `Bestellnummer: ${orderId}`,
          `Kunde: ${firstName} ${lastName}`,
          `Land: ${country}`,
          `Lieferadresse: ${streetAddress}`,
          `Telefon: ${whatsapp}`,
          `E-Mail: ${orderEmail}`,
          "",
          "Produkte:",
          ...items.map(
            (item) =>
              `- ${item.quantity} x ${item.title} (${item.category}) - CHF ${(item.unitPrice * item.quantity).toFixed(2)}`,
          ),
          "",
          `Zwischensumme: CHF ${subtotal.toFixed(2)}`,
          `Lieferung: CHF ${shippingCost.toFixed(2)}`,
          `Gesamt: CHF ${grandTotal.toFixed(2)}`,
          "Status: pending",
          `Datum: ${createdAt}`,
        ].join("\n"),
      });
    } catch (error) {
      emailNotificationSent = false;
      console.error(`Commande ${orderId} enregistrée, mais l'e-mail admin a échoué :`, error);
    }

    return NextResponse.json(
      { success: true, orderId, subtotal, shippingCost, grandTotal, emailNotificationSent },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Erreur lors de la création de la commande :", error);
    return NextResponse.json(
      { error: "Fehler beim Erstellen der Bestellung" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Accès non autorisé." }, { status: 401 });
    }

    const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
    if (allOrders.length === 0) {
      return NextResponse.json([], { headers: { "Cache-Control": "no-store" } });
    }

    const items = await db
      .select()
      .from(orderItems)
      .where(inArray(orderItems.orderId, allOrders.map((order) => order.id)));
    const itemsByOrder = new Map<string, typeof items>();
    for (const item of items) {
      const currentItems = itemsByOrder.get(item.orderId) ?? [];
      currentItems.push(item);
      itemsByOrder.set(item.orderId, currentItems);
    }

    return NextResponse.json(
      allOrders.map((order) => ({
        ...order,
        items: itemsByOrder.get(order.id) ?? [],
      })),
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Erreur lors du chargement des commandes :", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Bestellungen" },
      { status: 500 },
    );
  }
}

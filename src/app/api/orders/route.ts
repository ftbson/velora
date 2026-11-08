// app/api/orders/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders } from "@/lib/schema";
import { sendMail } from "@/lib/mail";
import { productsData } from "@/data/products";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// POST : Enregistrer une nouvelle commande
export async function POST(request: Request) {
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
    const email = typeof customer.email === "string" ? customer.email.trim() : "";

    if (!firstName || !lastName || !country || !street || !postalCode || !city || !whatsapp || !email) {
      return NextResponse.json(
        { error: "Bitte füllen Sie alle erforderlichen Kundendaten aus." },
        { status: 400 },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Ungültige E-Mail-Adresse." }, { status: 400 });
    }

    const items: { title: string; category: string; quantity: number; unitPrice: number }[] = [];
    for (const rawItem of body.items) {
      if (!isRecord(rawItem) || typeof rawItem.id !== "string" || !Number.isInteger(rawItem.quantity)) {
        return NextResponse.json({ error: "Ungültige Produktangaben." }, { status: 400 });
      }

      const quantity = Number(rawItem.quantity);
      const product = productsData.find((candidate) => candidate.id === rawItem.id);
      if (!product || quantity < 1 || quantity > 99) {
        return NextResponse.json({ error: "Ungültiges Produkt oder ungültige Menge." }, { status: 400 });
      }

      items.push({
        title: product.title,
        category: product.category,
        quantity,
        unitPrice: product.price,
      });
    }
    if (items.length === 0) {
      return NextResponse.json({ error: "Der Warenkorb ist leer." }, { status: 400 });
    }

    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const shippingCost = subtotal > 150 ? 0 : 15;
    const grandTotal = subtotal + shippingCost;
    const orderId = `ORD-${crypto.randomUUID()}`;

    await db.insert(orders).values({ 
      id: orderId,
      firstName,
      lastName,
      country,
      streetAddress,
      whatsapp,
      email,
      subtotal,
      shippingCost,
      grandTotal,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    const createdAt = new Date().toISOString();

    await sendMail({
      subject: `[Commande] ${orderId} - ${customer.firstName} ${customer.lastName}`,
      text: [
        "Nouvelle commande",
        "",
        `ID: ${orderId}`,
        `Client: ${firstName} ${lastName}`,
        `Pays: ${country}`,
        `Adresse: ${streetAddress}`,
        `WhatsApp: ${whatsapp}`,
        `E-Mail: ${email}`,
        "",
        "Produkte:",
        ...items.map(
          (item) =>
            `- ${item.quantity} x ${item.title} (${item.category}) - CHF ${(item.unitPrice * item.quantity).toFixed(2)}`,
        ),
        "",
        `Sous-total: CHF ${subtotal.toFixed(2)}`,
        `Livraison: CHF ${shippingCost.toFixed(2)}`,
        `Total: CHF ${grandTotal.toFixed(2)}`,
        "Statut: pending",
        `Date: ${createdAt}`,
      ].join("\n"),
    });

    return NextResponse.json({ success: true, orderId, subtotal, shippingCost, grandTotal });
  } catch (error) {
    console.error("Erreur lors de la création de la commande :", error);
    return NextResponse.json(
      { error: "Fehler beim Erstellen der Bestellung" },
      { status: 500 },
    );
  }
}

// GET : Récupérer toutes les commandes pour la page admin
export async function GET() {
  try {
    const allOrders = await db.select().from(orders);
    return NextResponse.json(allOrders);
  } catch (error) {
    console.error("Erreur lors du chargement des commandes :", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Bestellungen" },
      { status: 500 },
    );
  }
}

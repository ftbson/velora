// app/api/orders/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders } from "@/lib/schema";
import { sendMail } from "@/lib/mail";

// POST : Enregistrer une nouvelle commande
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, subtotal, shippingCost, grandTotal } = body;

    // Génération d'un ID unique pour la commande (ex: ORD-1725450000000)
    const orderId = `ORD-${Date.now()}`;

    await db.insert(orders).values({ 
      id: orderId,
      firstName: customer.firstName, 
      lastName: customer.lastName,
      country: customer.country,
      streetAddress: customer.streetAddress,
      whatsapp: customer.whatsapp,
      email: customer.email,
      subtotal: parseFloat(subtotal),
      shippingCost: parseFloat(shippingCost),
      grandTotal: parseFloat(grandTotal),
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
        `Client: ${customer.firstName} ${customer.lastName}`,
        `Pays: ${customer.country}`,
        `Adresse: ${customer.streetAddress}`,
        `WhatsApp: ${customer.whatsapp}`,
        `E-Mail: ${customer.email}`,
        `Sous-total: CHF ${Number(subtotal).toFixed(2)}`,
        `Livraison: CHF ${Number(shippingCost).toFixed(2)}`,
        `Total: CHF ${Number(grandTotal).toFixed(2)}`,
        "Statut: pending",
        `Date: ${createdAt}`,
      ].join("\n"),
    });

    return NextResponse.json({ success: true, orderId });
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

import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { isAdminAuthenticated, isSameOriginRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { orderItems, orders } from "@/lib/schema";
import { sendCustomerOrderStatusEmail } from "@/lib/mail";

const orderStatuses = ["pending", "paid", "shipped", "cancelled"] as const;

function isOrderStatus(value: unknown): value is (typeof orderStatuses)[number] {
  return (
    typeof value === "string" &&
    orderStatuses.some((status) => status === value)
  );
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 403 });
  }
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Accès non autorisé." }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();
    const status =
      typeof body === "object" && body !== null && "status" in body
        ? body.status
        : null;
    if (!isOrderStatus(status)) {
      return NextResponse.json({ error: "Ungültiger Bestellstatus." }, { status: 400 });
    }

    const { id } = await params;

    // Récupération préalable de la commande pour avoir les coordonnées du client
    const existingOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.id, id))
      .limit(1);

    if (existingOrders.length === 0) {
      return NextResponse.json({ error: "Bestellung nicht gefunden." }, { status: 404 });
    }

    const currentOrder = existingOrders[0];
    const previousStatus = currentOrder.status;

    // Mise à jour du statut dans la base de données
    const result = await db
      .update(orders)
      .set({ status })
      .where(eq(orders.id, id));

    if (result.rowsAffected === 0) {
      return NextResponse.json({ error: "Bestellung nicht gefunden." }, { status: 404 });
    }

    // Si le statut a changé, on envoie un e-mail au client
    let customerEmailSent = false;
    if (previousStatus !== status && currentOrder.email) {
      try {
        const items = await db
          .select()
          .from(orderItems)
          .where(eq(orderItems.orderId, id));

        await sendCustomerOrderStatusEmail({
          order: {
            id: currentOrder.id,
            firstName: currentOrder.firstName,
            lastName: currentOrder.lastName,
            email: currentOrder.email,
            country: currentOrder.country,
            streetAddress: currentOrder.streetAddress,
            grandTotal: currentOrder.grandTotal,
          },
          newStatus: status,
          items: items.map((item) => ({
            title: item.title,
            category: item.category,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        });
        customerEmailSent = true;
      } catch (emailError) {
        console.error(
          `Statut mis à jour pour la commande ${id}, mais l'envoi de l'e-mail client a échoué :`,
          emailError,
        );
      }
    }

    return NextResponse.json({
      success: true,
      id,
      status,
      customerEmailSent,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut de commande :", error);
    return NextResponse.json(
      { error: "Der Bestellstatus konnte nicht aktualisiert werden." },
      { status: 500 },
    );
  }
}

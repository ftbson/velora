import { desc, eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { orderItems, orders } from "@/lib/schema";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Authentifizierung erforderlich." }, { status: 401 });
    }

    const customerOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, user.id))
      .orderBy(desc(orders.createdAt));

    if (customerOrders.length === 0) {
      return NextResponse.json(
        { orders: [] },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const items = await db
      .select({
        id: orderItems.id,
        orderId: orderItems.orderId,
        productId: orderItems.productId,
        title: orderItems.title,
        category: orderItems.category,
        quantity: orderItems.quantity,
        unitPrice: orderItems.unitPrice,
      })
      .from(orderItems)
      .where(inArray(orderItems.orderId, customerOrders.map((order) => order.id)));

    const itemsByOrder = new Map<string, typeof items>();
    for (const item of items) {
      const currentItems = itemsByOrder.get(item.orderId) ?? [];
      currentItems.push(item);
      itemsByOrder.set(item.orderId, currentItems);
    }

    return NextResponse.json(
      {
        orders: customerOrders.map((order) => ({
          ...order,
          items: itemsByOrder.get(order.id) ?? [],
        })),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Erreur lors du chargement de l'historique client :", error);
    return NextResponse.json(
      { error: "Impossible de charger l'historique des commandes." },
      { status: 500 },
    );
  }
}

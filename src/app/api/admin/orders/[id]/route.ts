import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { isAdminAuthenticated, isSameOriginRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders } from "@/lib/schema";

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
    const result = await db
      .update(orders)
      .set({ status })
      .where(eq(orders.id, id));

    if (result.rowsAffected === 0) {
      return NextResponse.json({ error: "Bestellung nicht gefunden." }, { status: 404 });
    }

    return NextResponse.json({ success: true, id, status });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut de commande :", error);
    return NextResponse.json(
      { error: "Der Bestellstatus konnte nicht aktualisiert werden." },
      { status: 500 },
    );
  }
}

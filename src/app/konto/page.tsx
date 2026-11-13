import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders, orderItems } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { companyConfig, getFormattedAddress } from "@/config/company";
import OrderCard from "@/components/OrderCard";

const c = companyConfig;
const address = getFormattedAddress();

export const metadata = {
  title: "Mein Konto",
  description: "Ihr VELORA Kundenkonto – Bestellhistorie, Lieferadressen und Einstellungen.",
};

// This page requires authentication and database access - must be dynamic
export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    // Redirect to login handled by middleware or client-side
    return (
      <main className="account-page" style={{
        minHeight: "calc(100vh - 200px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem"
      }}>
        <div style={{ textAlign: "center", maxWidth: "400px" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
            Anmeldung erforderlich
          </h1>
          <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
            Bitte melden Sie sich an, um Ihr Konto aufzurufen.
          </p>
          <Link href="/anmelden" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.875rem 1.75rem",
            background: "#111827",
            color: "#fff",
            borderRadius: "9999px",
            fontWeight: 600,
            textDecoration: "none"
          }}>
            <i className="fa-solid fa-user"></i> Anmelden
          </Link>
        </div>
      </main>
    );
  }

  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, user.id))
    .orderBy(desc(orders.createdAt));

  const orderItemsMap = new Map();
  if (userOrders.length > 0) {
    const items = await db
      .select()
      .from(orderItems)
      .where(
        // Using inArray would be better but keeping simple
        eq(orderItems.orderId, userOrders[0].id)
      );
    // Group items by orderId
    for (const order of userOrders) {
      const orderItemsResult = await db
        .select()
        .from(orderItems)
        .where(eq(orderItems.orderId, order.id));
      orderItemsMap.set(order.id, orderItemsResult);
    }
  }

  return (
    <main className="account-page">
      <div className="account-container" style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "3rem 1.5rem"
      }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>
            Mein Konto
          </h1>
          <p style={{ color: "#6b7280" }}>
            Willkommen zurück, <strong>{user.name}</strong> ({user.email})
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "2rem" }}>
          {/* Sidebar */}
          <aside className="account-sidebar" style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1.5rem"
          }}>
            <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <div style={{ fontWeight: 600, color: "#111827", marginBottom: "0.25rem" }}>
                {user.name}
              </div>
              <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                {user.email}
              </div>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <Link href="/konto" style={{
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                fontWeight: 500,
                color: "#111827",
                textDecoration: "none",
                background: "#f3f4f6"
              }}>
                <i className="fa-solid fa-user" style={{ marginRight: "0.75rem", width: "20px", textAlign: "center" }}></i>
                Übersicht
              </Link>
              <Link href="/konto/bestellungen" style={{
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                fontWeight: 500,
                color: "#6b7280",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s"
              }}>
                <i className="fa-solid fa-box" style={{ marginRight: "0.75rem", width: "20px", textAlign: "center" }}></i>
                Bestellungen
              </Link>
              <Link href="/konto/adressen" style={{
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                fontWeight: 500,
                color: "#6b7280",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s"
              }}>
                <i className="fa-solid fa-address-book" style={{ marginRight: "0.75rem", width: "20px", textAlign: "center" }}></i>
                Adressen
              </Link>
              <Link href="/wunschliste" style={{
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                fontWeight: 500,
                color: "#6b7280",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s"
              }}>
                <i className="fa-regular fa-heart" style={{ marginRight: "0.75rem", width: "20px", textAlign: "center" }}></i>
                Wunschliste
              </Link>
              <Link href="/kontakt" style={{
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                fontWeight: 500,
                color: "#6b7280",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s"
              }}>
                <i className="fa-solid fa-headset" style={{ marginRight: "0.75rem", width: "20px", textAlign: "center" }}></i>
                Support
              </Link>
              <hr style={{ margin: "0.75rem 0", borderColor: "#e5e7eb" }} />
              <button
                onClick={() => fetch("/api/auth/logout", { method: "POST" }).then(() => window.location.reload())}
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  fontWeight: 500,
                  color: "#dc2626",
                  textDecoration: "none",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "inherit",
                  fontFamily: "inherit"
                }}
              >
                <i className="fa-solid fa-right-from-bracket" style={{ marginRight: "0.75rem", width: "20px", textAlign: "center" }}></i>
                Abmelden
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="account-main">
            {/* Bestellhistorie */}
            <section style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#111827" }}>
                  Bestellhistorie
                </h2>
                <Link href="/produkte" style={{
                  fontSize: "0.875rem",
                  color: "#D52B1E",
                  fontWeight: 500,
                  textDecoration: "underline"
                }}>
                  Weiter einkaufen
                </Link>
              </div>

              {userOrders.length === 0 ? (
                <div style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "3rem 2rem",
                  textAlign: "center"
                }}>
                  <i className="fa-solid fa-box-open" style={{ fontSize: "3rem", color: "#d1d5db", marginBottom: "1rem" }}></i>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#111827", marginBottom: "0.5rem" }}>
                    Noch keine Bestellungen
                  </h3>
                  <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
                    Wenn Sie eine Bestellung aufgeben, erscheint sie hier.
                  </p>
                  <Link href="/produkte" style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.5rem",
                    background: "#111827",
                    color: "#fff",
                    borderRadius: "9999px",
                    fontWeight: 600,
                    textDecoration: "none"
                  }}>
                    <i className="fa-solid fa-store"></i> Shop entdecken
                  </Link>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {userOrders.map((order) => {
                    const items = orderItemsMap.get(order.id) || [];

                    return (
                      <OrderCard key={order.id} order={order} items={items} />
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
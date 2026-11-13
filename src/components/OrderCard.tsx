"use client";

import Link from "next/link";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface OrderItem {
  id: string;
  productId: string;
  title: string;
  quantity: number;
  unitPrice: number;
}

interface OrderCardProps {
  order: {
    id: string;
    createdAt: string | null;
    grandTotal: number;
    status: string | null;
    paidAt: string | null;
  };
  items: OrderItem[];
}

const STATUS_LABELS: Record<string, string> = {
  pending: "Ausstehend",
  paid: "Bezahlt",
  shipped: "Versendet",
  cancelled: "Storniert",
  refunded: "Erstattet",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  paid: "#16a34a",
  shipped: "#2563eb",
  cancelled: "#dc2626",
  refunded: "#6b7280",
};

function getStatusLabel(status: string | null | undefined): string {
  return status ? STATUS_LABELS[status] || status : "—";
}

function getStatusColor(status: string | null | undefined): string {
  return status ? STATUS_COLORS[status] || "#6b7280" : "#6b7280";
}

export default function OrderCard({ order, items }: OrderCardProps) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <article style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      overflow: "hidden",
      transition: "box-shadow 0.2s"
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: "1.5rem",
        alignItems: "center",
        padding: "1.5rem",
        borderBottom: "1px solid #f3f4f6"
      }}>
        <div>
          <div style={{ fontWeight: 600, color: "#111827", fontFamily: "monospace", fontSize: "0.875rem" }}>
            {order.id}
          </div>
          <div style={{ fontSize: "0.8125rem", color: "#6b7280", marginTop: "0.25rem" }}>
            {order.createdAt ? format(new Date(order.createdAt), "dd. MMMM yyyy", { locale: de }) : "—"}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "0.8125rem", color: "#6b7280", marginBottom: "0.25rem" }}>
            {itemCount} Artikel
          </div>
          <div style={{ fontWeight: 700, fontSize: "1.125rem", color: "#111827" }}>
            CHF {Number(order.grandTotal).toFixed(2).replace(".", ",")}
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <span style={{
            display: "inline-block",
            padding: "0.375rem 0.875rem",
            borderRadius: "9999px",
            fontSize: "0.75rem",
            fontWeight: 600,
            background: `${getStatusColor(order.status)}20`,
            color: getStatusColor(order.status),
            textTransform: "uppercase",
            letterSpacing: "0.025em"
          }}>
            {getStatusLabel(order.status)}
          </span>
          {order.paidAt && (
            <div style={{ marginTop: "0.375rem", fontSize: "0.75rem", color: "#6b7280" }}>
              Bezahlt: {format(new Date(order.paidAt), "dd.MM.yyyy", { locale: de })}
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: "1rem 1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {items.slice(0, 3).map((item) => (
          <Link
            key={item.id}
            href={`/produkt/${item.productId}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
              color: "inherit",
              transition: "opacity 0.2s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "8px",
              background: "#f3f4f6",
              overflow: "hidden",
              flexShrink: 0
            }}>
              {item.title && (
                <span style={{ display: "block", width: "100%", height: "100%", background: "#e5e7eb" }} />
              )}
            </div>
            <div>
              <div style={{ fontWeight: 500, fontSize: "0.875rem", color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "180px" }}>
                {item.title}
              </div>
              <div style={{ fontSize: "0.8125rem", color: "#6b7280" }}>
                x{item.quantity} · CHF {Number(item.unitPrice).toFixed(2).replace(".", ",")}
              </div>
            </div>
          </Link>
        ))}
        {items.length > 3 && (
          <span style={{
            display: "flex",
            alignItems: "center",
            padding: "0 0.5rem",
            color: "#6b7280",
            fontSize: "0.875rem"
          }}>
            +{items.length - 3} weitere
          </span>
        )}
      </div>

      <div style={{
        padding: "1rem 1.5rem",
        background: "#fafafa",
        borderTop: "1px solid #f3f4f6",
        display: "flex",
        gap: "1rem",
        justifyContent: "flex-end"
      }}>
        <Link href={`/konto/bestellungen/${order.id}`} style={{
          padding: "0.5rem 1rem",
          background: "#fff",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          fontSize: "0.8125rem",
          fontWeight: 500,
          color: "#374151",
          textDecoration: "none",
          transition: "border-color 0.2s, color 0.2s"
        }}>
          Details
        </Link>
        {order.status === "pending" && (
          <Link href={`/kasse?order=${order.id}`} style={{
            padding: "0.5rem 1rem",
            background: "#D52B1E",
            borderRadius: "8px",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "#fff",
            textDecoration: "none",
            transition: "background 0.2s"
          }}>
            Jetzt bezahlen
          </Link>
        )}
      </div>
    </article>
  );
}
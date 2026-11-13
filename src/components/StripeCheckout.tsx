"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { companyConfig } from "@/config/company";

const c = companyConfig;

interface StripeCheckoutProps {
  orderId: string;
  onSuccess: () => void;
  onCancel: () => void;
  onError: (error: string) => void;
}

export default function StripeCheckout({ orderId, onSuccess, onCancel, onError }: StripeCheckoutProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "twint">("card");

  const handlePayment = async (method: "card" | "twint") => {
    setPaymentMethod(method);
    setIsLoading(true);
    setOnError("");

    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, paymentMethod: method }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Fehler beim Erstellen der Zahlungssitzung");
      }

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else if (data.sessionId) {
        // Use Stripe.js redirect (if Stripe.js is loaded)
        if (typeof window !== "undefined" && (window as any).Stripe) {
          const stripe = (window as any).Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
          const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
          if (error) throw error;
        } else {
          // Fallback: redirect via URL
          window.location.href = `${data.url}`;
        }
      }
    } catch (err) {
      console.error("Stripe checkout error:", err);
      setOnError(err instanceof Error ? err.message : "Zahlung fehlgeschlagen. Bitte versuchen Sie es erneut.");
      setIsLoading(false);
    }
  };

  const [error, setOnError] = useState("");

  return (
    <div className="stripe-checkout-container" style={{ padding: "1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div className="icon-wrapper" style={{ marginBottom: "1rem" }}>
          <i className="fa-solid fa-credit-card" style={{ fontSize: "2.5rem", color: "#D52B1E" }}></i>
        </div>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>
          Sichere Online-Zahlung
        </h2>
        <p style={{ color: "#6b7280", fontSize: "0.9375rem" }}>
          Sie werden zu Stripe weitergeleitet, um die Zahlung abzuschließen.
        </p>
      </div>

      {error && (
        <div style={{
          background: "#fef2f2",
          border: "1px solid #fecaca",
          color: "#b91c1c",
          padding: "0.875rem 1rem",
          borderRadius: "8px",
          marginBottom: "1.5rem",
          fontSize: "0.875rem",
          textAlign: "center"
        }}>
          {error}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <button
          type="button"
          onClick={() => handlePayment("card")}
          disabled={isLoading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            padding: "1rem 1.5rem",
            background: "#111827",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "0.9375rem",
            fontWeight: 600,
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1,
            transition: "background 0.2s"
          }}
        >
          <i className="fa-solid fa-credit-card" style={{ fontSize: "1.125rem" }}></i>
          <span>Mit Karte bezahlen (Visa, Mastercard, Amex)</span>
          {isLoading && <span className="spinner" style={{ width: "18px", height: "18px", border: "2px solid transparent", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }}></span>}
        </button>

        <button
          type="button"
          onClick={() => handlePayment("twint")}
          disabled={isLoading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            padding: "1rem 1.5rem",
            background: "#fff",
            color: "#111827",
            border: "2px solid #d1d5db",
            borderRadius: "10px",
            fontSize: "0.9375rem",
            fontWeight: 600,
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1,
            transition: "border-color 0.2s, background 0.2s"
          }}
        >
          <i className="fa-solid fa-mobile-screen" style={{ fontSize: "1.125rem", color: "#D52B1E" }}></i>
          <span>Mit TWINT bezahlen</span>
          {isLoading && <span className="spinner" style={{ width: "18px", height: "18px", border: "2px solid transparent", borderTopColor: "#D52B1E", borderRadius: "50%", animation: "spin 1s linear infinite" }}></span>}
        </button>
      </div>

      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          style={{
            background: "none",
            border: "none",
            color: "#6b7280",
            fontSize: "0.875rem",
            cursor: isLoading ? "not-allowed" : "pointer",
            textDecoration: "underline"
          }}
        >
          Zurück zur Banküberweisung
        </button>
      </div>

      <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #e5e7eb" }}>
        <p style={{ fontSize: "0.8125rem", color: "#9ca3af", textAlign: "center", lineHeight: 1.5 }}>
          <strong>Sicherheit:</strong> Die Zahlung wird über <strong>Stripe</strong> (PCI DSS Level 1 zertifiziert) abgewickelt.
          VELORA erhält keine vollständigen Kartendaten. Ihre Daten werden verschlüsselt übertragen.
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
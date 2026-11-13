"use client";

import Link from "next/link";
import Image from "next/image";
import { companyConfig } from "@/config/company";

const c = companyConfig;

export default function NotFound() {
  return (
    <main className="not-found-page" style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "3rem 1.5rem",
      textAlign: "center",
      background: "#fafafa"
    }}>
      <div style={{ maxWidth: "480px" }}>
        <div style={{
          fontSize: "12rem",
          fontWeight: 800,
          lineHeight: 1,
          color: "#D52B1E",
          marginBottom: "1rem",
          fontFamily: "Poppins, sans-serif"
        }}>
          404
        </div>
        <h1 style={{
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "#111827",
          marginBottom: "0.75rem"
        }}>
          Seite nicht gefunden
        </h1>
        <p style={{
          fontSize: "1.0625rem",
          color: "#6b7280",
          lineHeight: 1.6,
          marginBottom: "2rem"
        }}>
          Die gesuchte Seite existiert nicht oder wurde verschoben.
          Vielleicht haben Sie sich vertippt oder der Link ist veraltet.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/"
            className="btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 1.75rem",
              background: "#111827",
              color: "#fff",
              borderRadius: "9999px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#D52B1E"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#111827"}
          >
            <i className="fa-solid fa-house"></i> Zur Startseite
          </Link>
          <Link
            href="/produkte"
            className="btn-secondary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 1.75rem",
              background: "#fff",
              color: "#111827",
              border: "2px solid #e5e7eb",
              borderRadius: "9999px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "border-color 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "#D52B1E"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
          >
            <i className="fa-solid fa-store"></i> Zum Shop
          </Link>
        </div>

        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
          <p style={{ fontSize: "0.875rem", color: "#9ca3af", marginBottom: "0.5rem" }}>
            Können Sie nicht finden, was Sie suchen?
          </p>
          <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
            Kontaktieren Sie uns:{" "}
            <a href={`mailto:${c.email}`} style={{ color: "#D52B1E", textDecoration: "underline" }}>{c.email}</a>
            {" | "}
            <a href={`tel:${c.phoneRaw}`} style={{ color: "#D52B1E", textDecoration: "underline" }}>{c.phone}</a>
          </p>
        </div>
      </div>
    </main>
  );
}
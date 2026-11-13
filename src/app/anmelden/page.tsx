"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { companyConfig } from "@/config/company";

const c = companyConfig;

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const body = isLogin
        ? { email, password }
        : { name, email, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Fehler bei der Anmeldung");
      }

      router.push("/konto");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-page" style={{
      minHeight: "calc(100vh - 200px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "3rem 1.5rem",
      background: "#fafafa"
    }}>
      <div className="auth-card" style={{
        width: "100%",
        maxWidth: "440px",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        padding: "2.5rem",
        border: "1px solid #e5e7eb"
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link href="/" style={{ display: "inline-block", marginBottom: "1.5rem" }}>
            <Image
              src="/img/logo.png"
              alt={c.brandName}
              width={140}
              height={45}
            />
          </Link>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>
            {isLogin ? "Willkommen zurück" : "Konto erstellen"}
          </h1>
          <p style={{ color: "#6b7280", fontSize: "0.9375rem" }}>
            {isLogin
              ? "Melden Sie sich an, um Ihre Bestellungen zu sehen und schneller zu bestellen."
              : "Erstellen Sie ein Konto für schnelleres Checkout und Bestellübersicht."}
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

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: "1.25rem" }}>
              <label htmlFor="name" style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, color: "#374151", marginBottom: "0.375rem" }}>
                Name *
              </label>
              <input
                type="text"
                id="name"
                required={!isLogin}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Max Mustermann"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "0.9375rem",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s, box-shadow 0.2s"
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: "1.25rem" }}>
            <label htmlFor="email" style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, color: "#374151", marginBottom: "0.375rem" }}>
              E-Mail-Adresse *
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="max@example.ch"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "0.9375rem",
                boxSizing: "border-box",
                transition: "border-color 0.2s, box-shadow 0.2s"
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="password" style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, color: "#374151", marginBottom: "0.375rem" }}>
              Passwort *
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={8}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "0.9375rem",
                boxSizing: "border-box",
                transition: "border-color 0.2s, box-shadow 0.2s"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "0.875rem 1.5rem",
              background: "#111827",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "0.9375rem",
              fontWeight: 600,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              transition: "background 0.2s"
            }}
          >
            {isLoading ? "Wird verarbeitet..." : (isLogin ? "Anmelden" : "Konto erstellen")}
          </button>
        </form>

        <p style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem", color: "#6b7280" }}>
          {isLogin ? "Noch kein Konto? " : "Bereits ein Konto? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: "none",
              border: "none",
              color: "#D52B1E",
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "inherit",
              fontFamily: "inherit"
            }}
          >
            {isLogin ? "Jetzt registrieren" : "Anmelden"}
          </button>
        </p>

        <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #e5e7eb", textAlign: "center" }}>
          <Link href="/" style={{ color: "#6b7280", fontSize: "0.8125rem", textDecoration: "underline" }}>
            ← Zurück zum Shop
          </Link>
        </div>
      </div>
    </main>
  );
}
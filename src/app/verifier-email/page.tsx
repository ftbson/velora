"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setToken(new URLSearchParams(window.location.search).get("token") ?? "");
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  const verifyEmail = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!response.ok) {
        const data: unknown = await response.json();
        const message =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof data.error === "string"
            ? data.error
            : "Le lien est invalide ou a expiré.";
        throw new Error(message);
      }
      router.replace("/connexion?verified=success");
    } catch (verificationError) {
      setError(
        verificationError instanceof Error
          ? verificationError.message
          : "La vérification a échoué.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="account-auth-page">
      <section className="account-auth-card account-verify-card">
        <div className="account-auth-heading">
          <span className="account-auth-icon">
            <i className="fa-solid fa-envelope-circle-check" aria-hidden="true" />
          </span>
          <p className="storefront-eyebrow">SÉCURITÉ DU COMPTE</p>
          <h1>Vérifier mon adresse e-mail</h1>
          <p>Confirmez votre adresse pour activer votre compte VELORA.</p>
        </div>
        {error && <p className="account-form-message error" role="alert">{error}</p>}
        <button
          className="storefront-primary-link account-submit"
          disabled={!token || isSubmitting}
          onClick={verifyEmail}
        >
          {isSubmitting ? "Vérification…" : "Confirmer mon adresse"}
        </button>
        {!token && !error && (
          <p className="account-form-message error" role="alert">
            Le lien de vérification est manquant.
          </p>
        )}
        <p className="account-verify-back">
          <Link href="/connexion">Retour à la connexion</Link>
        </p>
      </section>
    </main>
  );
}

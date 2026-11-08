"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type AccountMode = "login" | "register";

export default function SignInPage() {
  const router = useRouter();
  const { user, isLoading, refresh } = useAuth();
  const [mode, setMode] = useState<AccountMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [verificationRequired, setVerificationRequired] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      const verified = new URLSearchParams(window.location.search).get("verified");
      if (verified === "success") {
        setMessage("Adresse vérifiée. Vous pouvez maintenant vous connecter.");
      } else if (verified === "invalid") {
        setError("Ce lien est invalide ou a expiré. Demandez-en un nouveau.");
      } else if (verified === "error") {
        setError("La vérification a échoué. Réessayez plus tard.");
      }
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!isLoading && user) router.replace("/compte");
  }, [isLoading, router, user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setVerificationRequired(false);
    setIsSubmitting(true);

    try {
      const response = await fetch(
        mode === "register" ? "/api/auth/register" : "/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            mode === "register" ? { name, email, password } : { email, password },
          ),
        },
      );
      const data: unknown = await response.json();
      const responseMessage =
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof data.message === "string"
          ? data.message
          : "";

      if (!response.ok) {
        const responseError =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof data.error === "string"
            ? data.error
            : "Une erreur est survenue. Réessayez.";
        setError(responseError);
        setVerificationRequired(
          typeof data === "object" &&
            data !== null &&
            "verificationRequired" in data &&
            data.verificationRequired === true,
        );
        return;
      }

      if (mode === "register") {
        setMessage(responseMessage);
        setPassword("");
        return;
      }

      await refresh();
      router.replace("/compte");
      router.refresh();
    } catch (requestError) {
      console.error("Erreur lors de l'authentification :", requestError);
      setError("Connexion impossible. Vérifiez votre réseau puis réessayez.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendVerification = async () => {
    setError("");
    setMessage("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data: unknown = await response.json();
      if (!response.ok) {
        const responseError =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof data.error === "string"
            ? data.error
            : "Le lien ne peut pas être envoyé pour le moment.";
        throw new Error(responseError);
      }
      setMessage(
        typeof data === "object" && data !== null && "message" in data && typeof data.message === "string"
          ? data.message
          : "Consultez votre boîte e-mail.",
      );
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Le lien ne peut pas être envoyé pour le moment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="account-auth-page">
      <section className="account-auth-card">
        <Link href="/" className="account-back-link">
          <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          Retour à la boutique
        </Link>
        <div className="account-auth-heading">
          <span className="account-auth-icon">
            <i className="fa-regular fa-user" aria-hidden="true" />
          </span>
          <p className="storefront-eyebrow">MON COMPTE VELORA</p>
          <h1>{mode === "login" ? "Bon retour" : "Créer un compte"}</h1>
          <p>
            Retrouvez vos commandes et suivez leur statut dans votre espace client.
          </p>
        </div>

        <div className="account-auth-tabs" role="tablist" aria-label="Compte client">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "login"}
            className={mode === "login" ? "active" : ""}
            onClick={() => {
              setMode("login");
              setError("");
              setMessage("");
            }}
          >
            Se connecter
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "register"}
            className={mode === "register" ? "active" : ""}
            onClick={() => {
              setMode("register");
              setError("");
              setMessage("");
            }}
          >
            Créer un compte
          </button>
        </div>

        <form className="account-auth-form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <label>
              Nom complet
              <input
                autoComplete="name"
                maxLength={100}
                minLength={2}
                onChange={(event) => setName(event.target.value)}
                required
                value={name}
              />
            </label>
          )}
          <label>
            Adresse e-mail
            <input
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </label>
          <label>
            Mot de passe
            <input
              autoComplete={mode === "register" ? "new-password" : "current-password"}
              maxLength={128}
              minLength={mode === "register" ? 12 : undefined}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
            {mode === "register" && (
              <small>12 caractères minimum.</small>
            )}
          </label>

          {error && <p className="account-form-message error" role="alert">{error}</p>}
          {message && <p className="account-form-message success" role="status">{message}</p>}

          <button className="storefront-primary-link account-submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Veuillez patienter..."
              : mode === "login"
                ? "Se connecter"
                : "Créer mon compte"}
            {!isSubmitting && <i className="fa-solid fa-arrow-right" aria-hidden="true" />}
          </button>
        </form>

        {(verificationRequired || error) && email && (
          <button
            type="button"
            className="account-resend-link"
            disabled={isSubmitting || !email}
            onClick={resendVerification}
          >
            Renvoyer le lien de vérification
          </button>
        )}
      </section>
    </main>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export type CookieConsentState = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  timestamp: number;
} | null;

const STORAGE_KEY = "velora_cookie_consent";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    functional: true,
    analytics: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Small delay for smooth entrance
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 600);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  // Listen for open-cookie-settings event (e.g. from footer or legal page)
  useEffect(() => {
    const handleReopen = () => {
      setIsVisible(true);
      setShowDetails(true);
    };

    window.addEventListener("velora:open-cookie-banner", handleReopen);
    return () => window.removeEventListener("velora:open-cookie-banner", handleReopen);
  }, []);

  const saveConsent = (state: { necessary: boolean; functional: boolean; analytics: boolean }) => {
    const payload: CookieConsentState = {
      ...state,
      timestamp: Date.now(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore localStorage issues
    }
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, functional: true, analytics: true });
  };

  const handleRejectNonEssential = () => {
    saveConsent({ necessary: true, functional: false, analytics: false });
  };

  const handleSaveCustom = () => {
    saveConsent({
      necessary: true,
      functional: preferences.functional,
      analytics: preferences.analytics,
    });
  };

  if (!isVisible) return null;

  return (
    <div className="velora-cookie-overlay" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
      <div className="velora-cookie-modal">
        <div className="velora-cookie-header">
          <div className="velora-cookie-icon-wrap">
            <i className="fa-solid fa-cookie-bite"></i>
          </div>
          <div>
            <h2 id="cookie-title" className="velora-cookie-title">
              Wir schätzen Ihre Privatsphäre
            </h2>
            <p className="velora-cookie-subtitle">
              Transparenz und Schutz Ihrer Daten bei VELORA
            </p>
          </div>
        </div>

        <div className="velora-cookie-body">
          <p>
            Wir nutzen Cookies und ähnliche Technologien, um Ihnen eine optimale Navigation,
            den Warenkorb und ein sicheres Einkaufserlebnis zu ermöglichen.
            Sie können Ihre Einstellungen jederzeit anpassen.{" "}
            <Link href="/legal/cookies" className="velora-cookie-link">
              Mehr erfahren
            </Link>{" "}
            und{" "}
            <Link href="/legal/privacy" className="velora-cookie-link">
              Datenschutzerklärung
            </Link>.
          </p>

          {showDetails && (
            <div className="velora-cookie-details">
              <div className="velora-cookie-category">
                <div className="velora-cookie-cat-info">
                  <strong>Technisch notwendig</strong>
                  <span>Erforderlich für den Warenkorb, Login und Sicherheitsfunktionen.</span>
                </div>
                <span className="velora-cookie-badge-always">Immer aktiv</span>
              </div>

              <div className="velora-cookie-category">
                <div className="velora-cookie-cat-info">
                  <strong>Funktionale Präferenzen</strong>
                  <span>Speichert Ihre bevorzugten Filter, Merkliste und Einstellungen.</span>
                </div>
                <label className="velora-cookie-toggle">
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, functional: e.target.checked }))
                    }
                  />
                  <span className="velora-cookie-slider"></span>
                </label>
              </div>

              <div className="velora-cookie-category">
                <div className="velora-cookie-cat-info">
                  <strong>Statistik & Optimierung</strong>
                  <span>Hilft uns anonym zu verstehen, wie unser Shop genutzt wird.</span>
                </div>
                <label className="velora-cookie-toggle">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                    }
                  />
                  <span className="velora-cookie-slider"></span>
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="velora-cookie-footer">
          {!showDetails ? (
            <div className="velora-cookie-buttons-main">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="velora-cookie-btn velora-cookie-btn-secondary"
              >
                Nur notwendige
              </button>
              <button
                type="button"
                onClick={() => setShowDetails(true)}
                className="velora-cookie-btn velora-cookie-btn-ghost"
              >
                Einstellungen
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="velora-cookie-btn velora-cookie-btn-primary"
              >
                Alle akzeptieren
              </button>
            </div>
          ) : (
            <div className="velora-cookie-buttons-details">
              <button
                type="button"
                onClick={() => setShowDetails(false)}
                className="velora-cookie-btn velora-cookie-btn-ghost"
              >
                Zurück
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="velora-cookie-btn velora-cookie-btn-secondary"
              >
                Auswahl speichern
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="velora-cookie-btn velora-cookie-btn-primary"
              >
                Alle akzeptieren
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

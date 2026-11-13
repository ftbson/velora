"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export type CookieConsentState = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
} | null;

const STORAGE_KEY = "velora_cookie_consent";

// Consent Mode v2 default states (all denied until consent)
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}

function updateConsentMode(consent: { analytics: boolean; marketing: boolean }) {
  if (typeof window === "undefined") return;

  // Initialize dataLayer if not exists
  window.dataLayer = window.dataLayer || [];

  // Update Google Consent Mode v2
  window.dataLayer.push({
    event: "consent_update",
    consent: {
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
      analytics_storage: consent.analytics ? "granted" : "denied",
      functionality_storage: "granted", // functional preferences via localStorage
      security_storage: "granted", // necessary cookies
    },
  });

  // Also call gtag if available (for GTM/GA4)
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
      analytics_storage: consent.analytics ? "granted" : "denied",
      functionality_storage: "granted",
      security_storage: "granted",
    });
  }
}

function loadAnalyticsScripts() {
  if (typeof window === "undefined") return;

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  // Load Google Analytics (GA4) via gtag
  if (gaId && !document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gaId}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", gaId, {
      send_page_view: false, // We'll handle page views manually
    });
  }

  // Load Google Tag Manager
  if (gtmId && !document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${gtmId}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.appendChild(script);

    // Initialize dataLayer for GTM
    window.dataLayer = window.dataLayer || [];
  }
}

function loadMarketingScripts() {
  if (typeof window === "undefined") return;

  // Meta Pixel (Facebook)
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (metaPixelId && !document.querySelector(`script[src*="connect.facebook.net/en_US/fbevents.js"]`)) {
    // Initialize Facebook Pixel
    (function(f: any, b: any, e: any, v: any, n: any, t: any, s: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode?.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js', null, null, null);

    // Initialize and track
    if (typeof window.fbq === 'function') {
      window.fbq('init', metaPixelId);
      window.fbq('track', 'PageView');
    }
  }
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    functional: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Small delay for smooth entrance
        const timer = setTimeout(() => {
          setIsVisible(true);
          // Set default consent mode (all denied)
          updateConsentMode({ analytics: false, marketing: false });
        }, 600);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(stored);
        // Restore preferences
        setPreferences({
          functional: parsed.functional ?? true,
          analytics: parsed.analytics ?? false,
          marketing: parsed.marketing ?? false,
        });
        // Apply consent mode based on stored preferences
        updateConsentMode({ analytics: parsed.analytics ?? false, marketing: parsed.marketing ?? false });
        // Load scripts for granted categories
        if (parsed.analytics) loadAnalyticsScripts();
        if (parsed.marketing) loadMarketingScripts();
      }
    } catch {
      setIsVisible(true);
      updateConsentMode({ analytics: false, marketing: false });
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

  const saveConsent = (state: { necessary: boolean; functional: boolean; analytics: boolean; marketing: boolean }) => {
    const payload: CookieConsentState = {
      ...state,
      timestamp: Date.now(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore localStorage issues
    }
    setPreferences({
      functional: state.functional,
      analytics: state.analytics,
      marketing: state.marketing,
    });
    // Update consent mode
    updateConsentMode({ analytics: state.analytics, marketing: state.marketing });
    // Load scripts for newly granted categories
    if (state.analytics) loadAnalyticsScripts();
    if (state.marketing) loadMarketingScripts();
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, functional: true, analytics: true, marketing: true });
  };

  const handleRejectNonEssential = () => {
    saveConsent({ necessary: true, functional: false, analytics: false, marketing: false });
  };

  const handleSaveCustom = () => {
    saveConsent({
      necessary: true,
      functional: preferences.functional,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
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
                  <span>Erforderlich für den Warenkorb, Login, Sicherheitsfunktionen und Speicherung Ihrer Cookie-Einwilligung.</span>
                </div>
                <span className="velora-cookie-badge-always">Immer aktiv</span>
              </div>

              <div className="velora-cookie-category">
                <div className="velora-cookie-cat-info">
                  <strong>Funktionale Präferenzen</strong>
                  <span>Speichert Ihre bevorzugten Filter, Merkliste und Einstellungen im lokalen Speicher (localStorage). Keine Cookies.</span>
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
                  <span>Google Analytics (GA4) hilft uns anonym zu verstehen, wie unser Shop genutzt wird. IP-Anonymisierung aktiv. Consent Mode v2: analytics_storage.</span>
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

              <div className="velora-cookie-category">
                <div className="velora-cookie-cat-info">
                  <strong>Marketing & Personalisierung</strong>
                  <span>Meta Pixel (Facebook/Instagram) für Conversion-Tracking und Remarketing. Consent Mode v2: ad_storage, ad_user_data, ad_personalization.</span>
                </div>
                <label className="velora-cookie-toggle">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, marketing: e.target.checked }))
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
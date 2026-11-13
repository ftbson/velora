"use client";

import Link from "next/link";
import Image from "next/image";
import { companyConfig, getFormattedAddress } from "@/config/company";

export default function Footer() {
  const c = companyConfig;
  const address = getFormattedAddress();

  const handleOpenCookies = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("velora:open-cookie-banner"));
    }
  };

  return (
    <footer className="velora-footer" role="contentinfo">
      <div className="velora-footer-container">

        <div className="velora-footer-grid">
          <div className="velora-footer-col velora-footer-brand-col">
            <Link href="/" className="velora-footer-logo-link" aria-label={`${c.brandName} - Startseite`}>
              <Image
                src="/img/logo.png"
                alt={c.brandName}
                width={120}
                height={40}
                className="velora-footer-logo"
              />
            </Link>
            <p className="velora-footer-tagline">
              Fahrräder, Zubehör und Bekleidung für Alltag, Stadt und Tour.
              Kostenloser Versand in die ganze Schweiz & Liechtenstein.
            </p>
            <div className="velora-footer-shipping-badge">
              <i className="fa-solid fa-truck-fast"></i>
              <span>Kostenlose Lieferung</span>
            </div>

            {/* Unternehmensangaben im Footer für Google Merchant Center / Vertrauen */}
            <div className="velora-footer-company-info" style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <h4 style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem", color: "#fff" }}>
                {c.brandName} – {c.legalName || "Unternehmensname"}
              </h4>
              {address && (
                <address style={{ fontStyle: "normal", fontSize: "0.8125rem", lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}>
                  {c.street}<br />
                  {c.postalCode} {c.city}<br />
                  {c.country}
                </address>
              )}
              <div style={{ fontSize: "0.8125rem", lineHeight: 1.8, color: "rgba(255,255,255,0.8)", marginTop: "0.5rem" }}>
                <a href={`mailto:${c.email}`} style={{ color: "inherit", textDecoration: "underline" }}>{c.email}</a><br />
                <a href={`tel:${c.phoneRaw}`} style={{ color: "inherit", textDecoration: "underline" }}>{c.phone}</a>
                {c.openingHours && <br />}
                {c.openingHours && <span>{c.openingHours}</span>}
              </div>
              <p style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>
                <Link href="/legal/impressum" style={{ color: "inherit", textDecoration: "underline" }}>Impressum</Link>
                {c.uid && (
                  <>
                    <span style={{ margin: "0 0.5rem" }}>•</span>
                    <span>UID: {c.uid}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="velora-footer-col">
            <h4 className="velora-footer-title">Entdecken</h4>
            <ul className="velora-footer-links">
              <li><Link href="/products">Alle Produkte</Link></li>
              <li><Link href="/kategorie">Kategorien</Link></li>
              <li><Link href="/warenkorb">Warenkorb</Link></li>
              <li><Link href="/wishlist">Merkliste</Link></li>
            </ul>
          </div>

          <div className="velora-footer-col">
            <h4 className="velora-footer-title">Über {c.brandName}</h4>
            <ul className="velora-footer-links">
              <li><Link href="/ueber-uns">Über uns</Link></li>
              <li><Link href="/kontakt">Kontakt</Link></li>
              <li><Link href="/legal/versand-retouren">Versand & Rückgabe</Link></li>
              <li><Link href="/legal/terms">AGB</Link></li>
              <li><Link href="/legal/privacy">Datenschutz</Link></li>
              <li><Link href="/legal/cookies">Cookies</Link></li>
            </ul>
          </div>

          <div className="velora-footer-col">
            <h4 className="velora-footer-title">Kontakt & Beratung</h4>
            <div className="velora-footer-direct-contact">
              <a href={`tel:${c.phoneRaw}`} className="velora-footer-contact-item">
                <i className="fa-solid fa-phone"></i>
                <span>{c.phone}</span>
              </a>
              <a href={`mailto:${c.email}`} className="velora-footer-contact-item">
                <i className="fa-solid fa-envelope"></i>
                <span>{c.email}</span>
              </a>
            </div>
            {c.openingHours && (
              <p className="velora-footer-contact-text">{c.openingHours}</p>
            )}
            <ul className="velora-footer-links">
              <li><Link href="/kontakt">Zum Kontaktformular</Link></li>
            </ul>
          </div>
        </div>

        <div className="velora-huge-brand-text" aria-hidden="true">
          <span>{c.brandName}</span>
        </div>

        <div className="velora-footer-bottom">
          <p>&copy; {new Date().getFullYear()} {c.brandName}. Alle Rechte vorbehalten.</p>
          <div className="velora-footer-bottom-links">
            <Link href="/legal/impressum">Impressum</Link>
            <Link href="/legal/terms">AGB</Link>
            <Link href="/legal/privacy">Datenschutz</Link>
            <Link href="/legal/cookies">Cookies</Link>
            <button
              type="button"
              onClick={handleOpenCookies}
              className="velora-footer-cookie-trigger"
            >
              Cookie-Einstellungen
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
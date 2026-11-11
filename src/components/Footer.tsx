"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/config/site";

export default function Footer() {
  const handleOpenCookies = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("velora:open-cookie-banner"));
    }
  };

  return (
    <footer className="velora-footer">
      <div className="velora-footer-container">
        
        <div className="velora-footer-grid">
          <div className="velora-footer-col velora-footer-brand-col">
            <Link href="/" className="velora-footer-logo-link">
              <Image
                src="/img/logo.png"
                alt="VELORA"
                width={120}
                height={40}
                className="velora-footer-logo"
              />
            </Link>
            <p className="velora-footer-tagline">
              Fahrräder, Zubehör und Bekleidung für Alltag, Stadt und Tour.
              Kostenloser Versand in die ganze Schweiz &amp; Liechtenstein.
            </p>
            <div className="velora-footer-shipping-badge">
              <i className="fa-solid fa-truck-fast"></i>
              <span>Kostenlose Lieferung</span>
            </div>
          </div>

          <div className="velora-footer-col">
            <h4 className="velora-footer-title">Entdecken</h4>
            <ul className="velora-footer-links">
              <li><Link href="/products">Alle Produkte</Link></li>
              <li><Link href="/categorie">Kategorien</Link></li>
              <li><Link href="/cart">Warenkorb</Link></li>
              <li><Link href="/wishlist">Merkliste</Link></li>
            </ul>
          </div>

          <div className="velora-footer-col">
            <h4 className="velora-footer-title">Über VELORA</h4>
            <ul className="velora-footer-links">
              <li><Link href="/a-propos">Über uns</Link></li>
              <li><Link href="/contact">Kontakt</Link></li>
              <li><Link href="/legal/versand-retouren">Versand &amp; Rückgabe</Link></li>
              <li><Link href="/legal/terms">AGB</Link></li>
              <li><Link href="/legal/privacy">Datenschutz</Link></li>
            </ul>
          </div>

          <div className="velora-footer-col">
            <h4 className="velora-footer-title">Kontakt &amp; Beratung</h4>
            <div className="velora-footer-direct-contact">
              <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="velora-footer-contact-item">
                <i className="fa-solid fa-phone"></i>
                <span>{SITE_CONFIG.phone}</span>
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="velora-footer-contact-item">
                <i className="fa-solid fa-envelope"></i>
                <span>{SITE_CONFIG.email}</span>
              </a>
            </div>
            <p className="velora-footer-contact-text">
              {SITE_CONFIG.openingHours}
            </p>
            <ul className="velora-footer-links">
              <li><Link href="/contact">Zum Kontaktformular</Link></li>
            </ul>
          </div>
        </div>

        <div className="velora-huge-brand-text">
          <span>VELORA</span>
        </div>

        <div className="velora-footer-bottom">
          <p>&copy; {new Date().getFullYear()} VELORA. Alle Rechte vorbehalten.</p>
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
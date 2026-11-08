"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
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
              E-Bikes für Alltag, Stadt und Abenteuer.
            </p>
          </div>

          <div className="velora-footer-col">
            <h4 className="velora-footer-title">Entdecken</h4>
            <ul className="velora-footer-links">
              <li><Link href="/products">E-Bike Shop</Link></li>
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
              <li><Link href="/legal/versand-retouren">Versand & Rückgabe</Link></li>
              <li><Link href="/legal/terms">AGB</Link></li>
              <li><Link href="/legal/privacy">Datenschutz</Link></li>
            </ul>
          </div>

          <div className="velora-footer-col">
            <h4 className="velora-footer-title">Fragen?</h4>
            <p className="velora-footer-contact-text">
              Unser Kontaktformular hilft Ihnen bei Fragen zu Produkten und
              Bestellungen.
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
          </div>
        </div>

      </div>
    </footer>
  );
}
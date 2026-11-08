"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="velora-footer">
      <div className="velora-footer-container">
        
        {/* Grille principale des liens et informations */}
        <div className="velora-footer-grid">
          
          {/* Colonne 1 : Logo & Réseaux sociaux */}
          <div className="velora-footer-col velora-footer-brand-col">
            <Link href="/" className="velora-footer-logo-link">
              <Image 
                src="/img/logo.jpeg" 
                alt="VELORA Logo" 
                width={120} 
                height={40} 
                className="velora-footer-logo"
              />
            </Link>
            <p className="velora-footer-tagline">
              Schweizer Qualität für elektrische Mobilität. Entdecken Sie die Zukunft des Radfahrens in Stadt und Bergen.
            </p>
            <div className="velora-social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Colonne 2 : Nos Services */}
          <div className="velora-footer-col">
            <h4 className="velora-footer-title">Unsere Dienstleistungen</h4>
            <ul className="velora-footer-links">
              <li><Link href="/shop">E-Bike Shop</Link></li>
              <li><Link href="/offers">Sonderangebote</Link></li>
              <li><Link href="/services/test-ride">Probefahrt buchen</Link></li>
              <li><Link href="/services/workshop">Werkstatt & Reparatur</Link></li>
              <li><Link href="/blog">Ratgeber & Blog</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Notre Société */}
          <div className="velora-footer-col">
            <h4 className="velora-footer-title">Über VELORA</h4>
            <ul className="velora-footer-links">
              <li><Link href="/about">Über uns</Link></li>
              <li><Link href="/contact">Kontakt</Link></li>
              <li><Link href="/stores">Unsere Standorte</Link></li>
              <li><Link href="/legal/terms">AGB</Link></li>
              <li><Link href="/legal/privacy">Datenschutz</Link></li>
            </ul>
          </div>

          {/* Colonne 4 : Contact & Infos Suisse */}
          <div className="velora-footer-col">
            <h4 className="velora-footer-title">Kontakt Schweiz</h4>
            <p className="velora-footer-contact-text">
              <i className="fa-solid fa-envelope"></i> contact@velora.ch
            </p>
            <p className="velora-footer-contact-text">
              <i className="fa-solid fa-location-dot"></i> Zürich, Schweiz
            </p>
            <div className="velora-footer-badge-box">
              <span className="swiss-quality-badge">🇨🇭 Swiss E-Bike Standard</span>
            </div>
          </div>

        </div>

        {/* Grand Titre Typographique Minimaliste (Inspiré du style de la 1ère image) */}
        <div className="velora-huge-brand-text">
          <span>VELORA</span>
        </div>

        {/* Bas du Footer : Copyright */}
        <div className="velora-footer-bottom">
          <p>&copy; {new Date().getFullYear()} VELORA Schweiz. Alle Rechte vorbehalten.</p>
          <div className="velora-footer-bottom-links">
            <Link href="/legal/impressum">Impressum</Link>
            <Link href="/legal/cookies">Cookie-Einstellungen</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
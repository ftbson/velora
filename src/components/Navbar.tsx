"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header className="velora-header">
      {/* Barre Principale Haut (Fond Blanc) */}
      <div className="velora-main-nav">
        <div className="velora-nav-container">
          
          {/* Gauche : Mobile Hamburger + Logo */}
          <div className="velora-nav-left">
            <button 
              className="velora-hamburger-btn" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <i className={`fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
            </button>

            <Link href="/" className="velora-logo-link">
              <Image 
                src="/img/logo.png" 
                alt="VELORA Logo" 
                width={130} 
                height={45} 
                priority
                className="velora-logo-img"
              />
            </Link>
          </div>

          {/* Recherche Desktop (Élargie & Centrée) */}
          <div className="velora-search-container desktop-only">
            <div className="velora-search-box">
              <i className="fa-solid fa-magnifying-glass velora-search-icon"></i>
              <input 
                type="text" 
                placeholder="E-Bikes, Zubehör suchen..." 
                className="velora-search-input"
              />
            </div>
          </div>

          {/* Droite : Recherche Mobile, Favoris & Panier */}
          <div className="velora-nav-right">
            {/* Bouton Loupe (Mobile uniquement) */}
            <button 
              className="velora-icon-btn mobile-only" 
              onClick={() => setIsMobileSearchOpen(true)}
              aria-label="Suchen"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            {/* Favoris */}
            <Link href="/wishlist" className="velora-icon-btn" aria-label="Wunschliste">
              <i className="fa-regular fa-heart"></i>
              <span className="velora-badge">0</span>
            </Link>

            {/* Panier */}
            <Link href="/cart" className="velora-icon-btn" aria-label="Warenkorb">
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="velora-badge">0</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Sous-barre de Catégories (Centrée sur Desktop) */}
      <nav className={`velora-sub-nav ${isMobileMenuOpen ? "mobile-open" : ""}`}>
       <div className="velora-sub-nav-container">
  <ul className="velora-nav-links">
    <li>
      <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
        Startseite
      </Link>
    </li>
    <li>
      <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>
        Shop
      </Link>
    </li>
    <li>
      <Link href="/offers" onClick={() => setIsMobileMenuOpen(false)} className="highlight-link">
        Angebote
      </Link>
    </li>
    <li>
      <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
        Über uns
      </Link>
    </li>
    <li>
      <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
        Kontakt
      </Link>
    </li>
  </ul>
</div>
      </nav>

      {/* Overlay Sombre pour le Menu Hamburger (Mobile) */}
      {isMobileMenuOpen && (
        <div className="velora-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Pop-up de Recherche Mobile (Flou d'arrière-plan + Premier Plan) */}
      {isMobileSearchOpen && (
        <div className="velora-mobile-search-modal">
          <div className="velora-mobile-search-content">
            <div className="velora-mobile-search-header">
              <div className="velora-search-box">
                <i className="fa-solid fa-magnifying-glass velora-search-icon"></i>
                <input 
                  type="text" 
                  placeholder="E-Bikes, Zubehör suchen..." 
                  className="velora-search-input"
                  autoFocus
                />
              </div>
              <button 
                className="velora-close-search-btn"
                onClick={() => setIsMobileSearchOpen(false)}
                aria-label="Schliessen"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
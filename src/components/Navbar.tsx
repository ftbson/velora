"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { favorites, totalItems } = useCart();
  const { user, isLoading } = useAuth();
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

          {/* Recherche Desktop */}
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
            <Link
              href={user ? "/compte" : "/connexion"}
              className="velora-account-link"
              aria-label={user ? `Konto von ${user.name}` : "Anmelden oder Konto erstellen"}
            >
              <i className="fa-regular fa-user" aria-hidden="true"></i>
              {!isLoading && (
                <span>{user ? user.name : "Anmelden"}</span>
              )}
            </Link>

            {/* Bouton Loupe (Mobile uniquement) */}
            <button 
              className="velora-icon-btn mobile-only" 
              onClick={() => setIsMobileSearchOpen(true)}
              aria-label="Suchen"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            {/* Favoris */}
            <Link
              href="/wishlist"
              className="velora-icon-btn"
              aria-label={`Wunschliste, ${favorites.length} Produkte`}
            >
              <i className="fa-regular fa-heart"></i>
              <span className="velora-badge">{favorites.length}</span>
            </Link>

            {/* Panier */}
            <Link
              href="/panier"
              className="velora-icon-btn"
              aria-label={`Warenkorb, ${totalItems} Artikel`}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="velora-badge">{totalItems}</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Sous-barre de Nav (Menu Mobile avec Icônes & Flèches) */}
      <nav className={`velora-sub-nav ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="velora-sub-nav-container">
          <ul className="velora-nav-links">
            <li>
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="nav-link-content">
                  <i className="fa-solid fa-house nav-icon-mobile"></i>
                  Startseite
                </span>
                <i className="fa-solid fa-chevron-right nav-arrow-mobile"></i>
              </Link>
            </li>

            <li>
              <Link href="/products" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="nav-link-content">
                  <i className="fa-solid fa-store nav-icon-mobile"></i>
                  Shop
                </span>
                <i className="fa-solid fa-chevron-right nav-arrow-mobile"></i>
              </Link>
            </li>

            <li>
              <Link href="/categorie" onClick={() => setIsMobileMenuOpen(false)} className="highlight-link">
                <span className="nav-link-content">
                  <i className="fa-solid fa-layer-group nav-icon-mobile"></i>
                  Kategorien
                </span>
                <i className="fa-solid fa-chevron-right nav-arrow-mobile"></i>
              </Link>
            </li>

            <li>
              <Link href="/categorie/enfants" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="nav-link-content">
                  <i className="fa-solid fa-child nav-icon-mobile"></i>
                  Enfants
                </span>
                <i className="fa-solid fa-chevron-right nav-arrow-mobile"></i>
              </Link>
            </li>

            <li>
              <Link href="/categorie/vetements" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="nav-link-content">
                  <i className="fa-solid fa-shirt nav-icon-mobile"></i>
                  Vêtements
                </span>
                <i className="fa-solid fa-chevron-right nav-arrow-mobile"></i>
              </Link>
            </li>

            <li>
              <Link href="/categorie/accessoires" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="nav-link-content">
                  <i className="fa-solid fa-helmet-safety nav-icon-mobile"></i>
                  Accessoires
                </span>
                <i className="fa-solid fa-chevron-right nav-arrow-mobile"></i>
              </Link>
            </li>

            <li>
              <Link href="/a-propos" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="nav-link-content">
                  <i className="fa-solid fa-circle-info nav-icon-mobile"></i>
                  Über uns
                </span>
                <i className="fa-solid fa-chevron-right nav-arrow-mobile"></i>
              </Link>
            </li>

            <li>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="nav-link-content">
                  <i className="fa-solid fa-envelope nav-icon-mobile"></i>
                  Kontakt
                </span>
                <i className="fa-solid fa-chevron-right nav-arrow-mobile"></i>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Overlay Sombre */}
      {isMobileMenuOpen && (
        <div className="velora-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Pop-up Recherche Mobile */}
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
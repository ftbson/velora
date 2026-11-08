"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  // SECURISE : Si le produit est undefined ou nul, on ne rend rien
  if (!product) {
    return null;
  }

  return (
    <div className="velora-product-card">
      {/* Badge PROMO Haut Droite */}
      {product.badgePromo && (
        <span className="velora-badge-promo">PROMO</span>
      )}

      {/* Visuel & Logo Marque Haut Gauche */}
      <div className="velora-card-top">
        <span className="velora-brand-label">{product.brand}</span>
        <Link href={`/produkt/${product.id}`} className="velora-card-img-wrapper">
          <Image
            src={product.image}
            alt={product.title}
            width={320}
            height={220}
            className="velora-card-img"
          />
        </Link>
      </div>

      {/* Section Médiane : Avis & Badge Catégorie */}
      <div className="velora-card-meta">
        <button className="velora-wishlist-btn" aria-label="Zur Wunschliste hinzufügen">
          <i className="fa-regular fa-heart"></i>
        </button>
        
        <div className="velora-card-rating">
          <div className="velora-stars">
            {"★".repeat(Math.floor(product.rating || 5))}
          </div>
          <span className="velora-reviews-count">{product.reviewsCount} avis</span>
        </div>

        <span className={`velora-badge-cat cat-${product.category?.toLowerCase()}`}>
          {product.category}
        </span>
      </div>

      {/* Titre & Spécifications (Nm / Wh) */}
      <div className="velora-card-info">
        <span className="velora-sub-cat">{product.categoryLabel}</span>
        <h3 className="velora-product-title">
          <Link href={`/produkt/${product.id}`}>{product.title}</Link>
        </h3>

        <div className="velora-specs-row">
          <span className="velora-spec-item">
            <i className="fa-solid fa-gear"></i> {product.motorTorque}
          </span>
          <span className="velora-spec-item">
            <i className="fa-solid fa-battery-three-quarters"></i> {product.batteryCapacity}
          </span>
        </div>
      </div>

      {/* Bas de Carte : Prix & Boutons d'Action */}
      <div className="velora-card-bottom">
        <div className="velora-price-block">
          <div className="velora-price-main">
            <span className="velora-current-price">CHF {product.price?.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="velora-old-price">CHF {product.oldPrice.toFixed(2)}</span>
            )}
            {product.discount && (
              <span className="velora-discount-tag">{product.discount}</span>
            )}
          </div>
          {product.savings && (
            <span className="velora-savings-text">
              Sie sparen CHF {product.savings.toFixed(2)}
            </span>
          )}
        </div>

        {/* Variantes de couleur & Boutons d'action */}
        <div className="velora-card-actions">
          <div className="velora-color-dots">
            {product.colors?.map((color, i) => (
              <span key={i} className="velora-color-dot" style={{ backgroundColor: color }}></span>
            ))}
          </div>

          <div className="velora-btn-group">
            <button 
              className="velora-add-cart-btn" 
              onClick={() => addToCart(product)}
              title="In den Warenkorb"
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </button>

            <Link 
              href={`/produkt/${product.id}`} 
              className="velora-quick-view-btn"
              title="Details anzeigen"
            >
              <i className="fa-solid fa-eye"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
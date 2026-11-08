"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  // Sécurité si le produit n'est pas transmis
  if (!product) {
    return null;
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="velora-product-card">
      {/* Badge PROMO conditionnel (affiché seulement si le produit est en promo) */}
      {product.badgePromo && (
        <span className="velora-badge-promo">PROMO</span>
      )}

      {/* Zone Supérieure : Marque, Image & Favori */}
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

        {/* Bouton Favori en bas à gauche du visuel */}
        <button 
          className={`velora-wishlist-btn ${isFavorite ? "active" : ""}`} 
          onClick={toggleFavorite}
          aria-label="Zur Wunschliste hinzufügen"
        >
          <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
        </button>

        {/* Badge Catégorie (VILLE, VTC, VTT) en bas à droite de l'image */}
        <span className={`velora-badge-cat cat-${product.category?.toLowerCase()}`}>
          {product.category}
        </span>
      </div>

      {/* Informations & Spécifications */}
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

      {/* Bas de Carte : Prix & Bouton Ajouter au Panier */}
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

        {/* Bouton Ajouter au panier direct sur la carte */}
        <div className="velora-card-actions">
          <button 
            className="velora-add-cart-btn" 
            onClick={handleAddToCart}
            title="In den Warenkorb"
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
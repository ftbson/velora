"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getProductCategoryName,
  getProductSubcategoryName,
  type Product,
} from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const {
    addToCart,
    toggleFavorite: updateFavorite,
    isFavorite,
  } = useCart();

  if (!product) {
    return null;
  }

  const favorite = isFavorite(product.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateFavorite(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="velora-product-card">
      {/* Angebots-Badge nur bei reduzierten Produkten */}
      {product.badgePromo && (
        <span className="velora-badge-promo">ANGEBOT</span>
      )}

      {/* Zone Supérieure : Marque, Image & Favori */}
      <div className="velora-card-top">
        <span className="velora-brand-label">{product.brand}</span>
        
        <Link href={`/produkt/${product.id}`} className="velora-card-img-wrapper">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              width={320}
              height={220}
              className="velora-card-img"
            />
          ) : (
            <span className="catalog-image-placeholder">
              <span>Produktbild hinzufügen</span>
              {product.imageFile && <code>{product.imageFile}</code>}
            </span>
          )}
        </Link>

        {/* Bouton Favori en bas à gauche du visuel */}
        <button 
          className={`velora-wishlist-btn ${favorite ? "active" : ""}`} 
          onClick={toggleFavorite}
          aria-label={favorite ? "Aus Wunschliste entfernen" : "Zur Wunschliste hinzufügen"}
          aria-pressed={favorite}
        >
          <i className={favorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
        </button>

        {/* Produktkategorie */}
        <span className={`velora-badge-cat cat-${product.category?.toLowerCase()}`}>
          {getProductCategoryName(product.category)}
        </span>
      </div>

      {/* Informations & Spécifications */}
      <div className="velora-card-info">
        <span className="velora-sub-cat">
          {getProductSubcategoryName(product.categoryLabel)}
        </span>
        {product.isDraft && (
          <span className="catalog-draft-badge">VOR VERKAUF BESTÄTIGEN</span>
        )}
        <h3 className="velora-product-title">
          <Link href={`/produkt/${product.id}`}>{product.title}</Link>
        </h3>

        <div className="velora-specs-row">
          {product.motorTorque && (
            <span className="velora-spec-item">
              <i className="fa-solid fa-gear" aria-hidden="true" /> {product.motorTorque}
            </span>
          )}
          {product.batteryCapacity && (
            <span className="velora-spec-item">
              <i className="fa-solid fa-battery-three-quarters" aria-hidden="true" />{" "}
              {product.batteryCapacity}
            </span>
          )}
          {!product.motorTorque &&
            product.details?.slice(0, 2).map((detail) => (
              <span className="velora-spec-item" key={detail.label}>
                <i className="fa-solid fa-circle-info" aria-hidden="true" />{" "}
                {detail.value}
              </span>
            ))}
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
            disabled={product.isDraft}
            onClick={handleAddToCart}
            title={product.isDraft ? "Produktdaten werden ergänzt" : "In den Warenkorb"}
            aria-label={
              product.isDraft
                ? `${product.title} ist noch ein Musterartikel`
                : `${product.title} in den Warenkorb legen`
            }
          >
            <i
              className={product.isDraft ? "fa-regular fa-clock" : "fa-solid fa-cart-shopping"}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
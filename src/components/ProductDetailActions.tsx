"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

export default function ProductDetailActions({
  product,
}: {
  product: Product;
}) {
  const { addToCart, isFavorite, toggleFavorite } = useCart();
  const [added, setAdded] = useState(false);
  const favorite = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
  };

  return (
    <div className="velora-detail-actions">
      <button
        className="velora-detail-add-btn"
        disabled={product.isDraft}
        onClick={handleAddToCart}
      >
        <i
          className={product.isDraft ? "fa-regular fa-clock" : "fa-solid fa-cart-shopping"}
          aria-hidden="true"
        />
        {product.isDraft ? "Produktdaten werden ergänzt" : "In den Warenkorb"}
      </button>
      <button
        className="velora-detail-favorite-btn"
        onClick={() => toggleFavorite(product.id)}
        aria-pressed={favorite}
      >
        <i
          className={favorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}
          aria-hidden="true"
        />
        {favorite ? "Aus Wunschliste entfernen" : "Zur Wunschliste"}
      </button>
      {added && (
        <p className="product-added-message" role="status">
          Zum Warenkorb hinzugefügt. <Link href="/panier">Warenkorb ansehen</Link>
        </p>
      )}
      {product.isDraft && (
        <p className="product-added-message" role="status">
          Dieser Musterartikel kann noch nicht bestellt werden.
        </p>
      )}
    </div>
  );
}

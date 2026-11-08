"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { productsData } from "@/data/products";

export default function WishlistPage() {
  const { favorites } = useCart();
  const products = productsData.filter((product) =>
    favorites.includes(product.id),
  );

  return (
    <main className="catalog-page wishlist-page">
      <header className="catalog-heading">
        <p className="storefront-eyebrow">IHRE AUSWAHL</p>
        <h1>Meine Wunschliste</h1>
        <p>{products.length} gespeicherte Produkte</p>
      </header>

      {products.length ? (
        <div className="storefront-product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="storefront-empty-state">
          <i className="fa-regular fa-heart" aria-hidden="true" />
          <h2>Ihre Wunschliste ist noch leer</h2>
          <p>Speichern Sie Produkte mit dem Herzsymbol, um sie hier wiederzufinden.</p>
          <Link href="/products" className="storefront-primary-link">
            E-Bikes entdecken
          </Link>
        </div>
      )}
    </main>
  );
}

"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { productsData } from "@/data/products";
import { searchProducts } from "@/utils/search";

interface ShopGridProps {
  initialQuery?: string;
}

export default function ShopGrid({ initialQuery = "" }: ShopGridProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? searchParams.get("search") ?? initialQuery;

  const filteredProducts = useMemo(() => {
    if (!query || !query.trim()) return productsData;
    return searchProducts(query, productsData);
  }, [query]);

  return (
    <section className="catalog-page" aria-labelledby="shop-title">
      <header className="catalog-heading">
        <p className="storefront-eyebrow">
          {query.trim() ? "SUCHERGEBNISSE" : "VELORA BIKE-SHOP"}
        </p>
        <h1 id="shop-title">
          {query.trim() ? `Suchergebnisse für „${query.trim()}“` : "Alle Produkte"}
        </h1>
        <p>
          {query.trim()
            ? `${filteredProducts.length} ${
                filteredProducts.length === 1 ? "Produkt gefunden" : "Produkte gefunden"
              }`
            : "Fahrräder, Zubehör und Bekleidung für Stadt, Tour und Gelände"}
        </p>

        {query.trim() && (
          <div className="search-active-filter-bar">
            <span className="search-filter-tag">
              Suchbegriff: <strong>{query.trim()}</strong>
            </span>
            <Link href="/products" className="search-reset-link">
              <i className="fa-solid fa-xmark"></i> Filter zurücksetzen
            </Link>
          </div>
        )}

        {!query.trim() && (
          <p className="catalog-draft-notice">
            Musterartikel sind gekennzeichnet. Bitte Preise, Verfügbarkeit und
            Produktdaten vor der Freigabe bestätigen.
          </p>
        )}
      </header>

      {filteredProducts.length > 0 ? (
        <div className="storefront-product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="search-no-products">
          <div className="search-no-products-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <h2>Keine passenden Produkte gefunden</h2>
          <p>
            Zu Ihrer Suche nach „<strong>{query.trim()}</strong>“ wurden keine passenden Artikel gefunden.
          </p>
          <div className="search-no-products-actions">
            <Link href="/products" className="search-view-all-link">
              Alle Produkte anzeigen
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

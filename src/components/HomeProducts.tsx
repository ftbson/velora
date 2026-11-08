"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { productsData, type Product } from "@/data/products";

function chooseRandomProducts(products: Product[], count: number) {
  const shuffled = [...products];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled.slice(0, count);
}

export default function HomeProducts() {
  const [products, setProducts] = useState(() => productsData.slice(0, 4));

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setProducts(chooseRandomProducts(productsData, 4));
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="home-products-section" aria-labelledby="home-products-title">
      <div className="storefront-section-header">
        <p className="storefront-eyebrow">VELORA AUSWAHL</p>
        <h2 id="home-products-title">Entdecken Sie unsere E-Bikes</h2>
        <p>Eine wechselnde Auswahl aus unserem gesamten Sortiment.</p>
      </div>
      <div className="storefront-product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="storefront-actions">
        <Link href="/products" className="storefront-primary-link">
          Alle Produkte ansehen
          <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

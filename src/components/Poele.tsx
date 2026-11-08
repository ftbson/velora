"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { getProductSlug, stoveProductsData } from "@/data/products";

export default function Poele() {
  const { addToCart } = useCart();

  return (
    <section className="bestsellers-section">
      <div className="bestsellers-container">
        {/* En-tête */}
        <div className="bestsellers-header">
          <h2 className="bestsellers-title">Unsere besten Kaminöfen</h2>
          <p className="bestsellers-subtitle">
            Sorgfältig ausgewählt, geprüft und sofort lieferbar.
          </p>
          <div className="bestsellers-line"></div>
        </div>

        {/* Grille de produits */}
        <div className="products-grid">
          {stoveProductsData.map((product) => (
            <div key={product.id} className="product-card">
              {/* Image & Badge de réduction */}
              <Link
                href={`/produkt/${getProductSlug(product)}`}
                className="product-image-wrap"
                aria-label={`Details für ${product.title}`}
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="product-image"
                />
                {product.discount && (
                  <span className="badge-discount">{product.discount}</span>
                )}
              </Link>

              {/* Détails du produit */}
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title">
                  <Link href={`/produkt/${getProductSlug(product)}`}>
                    {product.title}
                  </Link>
                </h3>

                {/* Avis */}
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fa-solid fa-star ${
                          i < Math.floor(product.rating ?? 0) ? "active" : ""
                        }`}
                      ></i>
                    ))}
                  </div>
                  <span className="reviews-count">({product.reviewsCount})</span>
                </div>

               {/* Prix */}
<div className="product-price-box">
  {product.oldPrice && (
    <span className="old-price">
      CHF {product.oldPrice.toFixed(2).replace(".", ",")}
    </span>
  )}
  <span className="current-price">
    CHF {product.price.toFixed(2).replace(".", ",")}
  </span>
</div>

                {/* Bouton d'ajout */}
                <button
                  className="btn-add-cart"
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      title: product.title,
                      category: product.category,
                      price: product.price,
                      oldPrice: product.oldPrice,
                      image: product.image,
                      // quantity: 1,
                    })
                  }
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  In den Warenkorb
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
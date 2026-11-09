import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { productsData } from "@/data/products";
import ProductDetailActions from "@/components/ProductDetailActions";

export async function generateStaticParams() {
  return productsData.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = productsData.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="velora-product-detail-page">
      <div className="velora-detail-container">
        {/* Fil d'ariane / Breadcrumb */}
        <div className="velora-breadcrumb">
          <Link href="/">Startseite</Link> / <Link href="/products">Shop</Link> / <span>{product.title}</span>
        </div>

        <div className="velora-detail-grid">
          {/* Gauche : Image / Galerie */}
          <div className="velora-detail-image-box">
            {product.badgePromo && <span className="velora-detail-promo-badge">{product.discount}</span>}
            {product.image ? (
              <Image
                src={product.image}
                alt={product.title}
                width={600}
                height={450}
                priority
                className="velora-detail-main-img"
              />
            ) : (
              <div className="catalog-detail-image-placeholder">
                <span>Produktbild hinzufügen</span>
                {product.imageFile && <code>{product.imageFile}</code>}
              </div>
            )}
          </div>

          {/* Droite : Infos & Achat */}
          <div className="velora-detail-info-box">
            <span className="velora-detail-brand">{product.brand}</span>
            <h1 className="velora-detail-title">{product.title}</h1>

            {product.rating !== undefined && product.reviewsCount !== undefined && (
              <div className="velora-detail-rating-row">
                <span className="velora-stars">
                  {"★".repeat(Math.floor(product.rating))}
                </span>
                <span className="velora-detail-reviews">
                  ({product.reviewsCount} Kundenbewertungen)
                </span>
              </div>
            )}

            {product.isDraft && (
              <p className="catalog-draft-notice" role="note">
                Lieferbarkeit und Verkaufskonditionen bitte vor dem Verkauf
                beim Lieferanten bestätigen.
              </p>
            )}

            <div className="velora-detail-price-box">
              <span className="velora-detail-current-price">CHF {product.price.toFixed(2)}</span>
              {product.oldPrice && <span className="velora-detail-old-price">CHF {product.oldPrice.toFixed(2)}</span>}
            </div>

            <p className="velora-detail-desc">{product.description}</p>

            {product.motorTorque && product.batteryCapacity && product.specs ? (
              <div className="velora-detail-key-specs">
                <div className="spec-card">
                  <strong>Drehmoment:</strong> {product.motorTorque}
                </div>
                <div className="spec-card">
                  <strong>Akku:</strong> {product.batteryCapacity}
                </div>
                <div className="spec-card">
                  <strong>Reichweite:</strong> {product.specs.range}
                </div>
              </div>
            ) : product.details?.length ? (
              <div className="velora-detail-full-specs">
                <h3>Produktdetails</h3>
                <ul>
                  {product.details.map((detail) => (
                    <li key={detail.label}>
                      <strong>{detail.label}:</strong> {detail.value}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Boutons d'action */}
            <ProductDetailActions product={product} />

            {/* Détails techniques */}
            {product.specs && (
              <div className="velora-detail-full-specs">
                <h3>Technische Daten</h3>
                <ul>
                  <li><strong>Rahmen:</strong> {product.specs.frame}</li>
                  <li><strong>Bremsen:</strong> {product.specs.brakes}</li>
                  <li><strong>Gewicht:</strong> {product.specs.weight}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
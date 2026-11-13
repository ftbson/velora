import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { productsData } from "@/data/products";
import ProductDetailActions from "@/components/ProductDetailActions";
import { companyConfig, getSiteUrl } from "@/config/company";

export async function generateStaticParams() {
  return productsData
    .filter((p) => !p.isDraft)
    .map((product) => ({
      id: product.id,
    }));
}

interface ProductJsonLd {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  image: string[];
  sku: string;
  brand: {
    "@type": string;
    name: string;
  };
  gtin?: string;
  mpn?: string;
  offers: {
    "@type": string;
    price: number;
    priceCurrency: string;
    availability: string;
    url: string;
    itemCondition: string;
    priceValidUntil?: string;
    seller: {
      "@type": string;
      name: string;
    };
  };
  shippingDetails?: {
    "@type": string;
    shippingRate: {
      "@type": string;
      value: number;
      currency: string;
    };
    shippingDestination: {
      "@type": string;
      addressCountry: string[];
    };
    deliveryTime: {
      "@type": string;
      businessDays: {
        "@type": string;
        dayOfWeek: string[];
      };
      cutoffTime: string;
      handlingTime: {
        "@type": string;
        minValue: number;
        maxValue: number;
      };
    };
  };
  hasMerchantReturnPolicy?: {
    "@type": string;
    applicableCountry: string[];
    returnPolicyCategory: string;
    merchantReturnDays: number;
    returnMethod: string;
    returnFees: string;
    refundType: string;
  };
  aggregateRating?: {
    "@type": string;
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
  };
}

function generateProductJsonLd(product: typeof productsData[0], c: typeof companyConfig): ProductJsonLd {
  const siteUrl = c.siteUrl.replace(/\/$/, "");
  const productUrl = `${siteUrl}/produkt/${product.id}`;

  // Availability mapping
  const availabilityMap: Record<string, string> = {
    in_stock: "https://schema.org/InStock",
    out_of_stock: "https://schema.org/OutOfStock",
    preorder: "https://schema.org/PreOrder",
    limited: "https://schema.org/LimitedAvailability",
  };
  const availability = product.isDraft
    ? "https://schema.org/OutOfStock"
    : "https://schema.org/InStock";

  // Images array
  const images = product.image ? [product.image] : [`${siteUrl}/img/logo.png`];

  // Base JSON-LD
  const jsonLd: ProductJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: images,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "CHF",
      availability,
      url: productUrl,
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: c.brandName,
      },
    },
  };

  // Add GTIN/MPN if available (from extended product fields)
  // These would come from database in production
  if ((product as any).gtin) {
    jsonLd.gtin = (product as any).gtin;
  }
  if ((product as any).mpn) {
    jsonLd.mpn = (product as any).mpn;
  }

  // Add priceValidUntil if compare_at_price is verified
  if (product.oldPrice && (product as any).price_verified) {
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 30); // 30 days validity
    jsonLd.offers.priceValidUntil = validUntil.toISOString().split("T")[0];
  }

  // Shipping details (free shipping CH & LI)
  jsonLd.shippingDetails = {
    "@type": "OfferShippingDetails",
    shippingRate: {
      "@type": "MonetaryAmount",
      value: 0,
      currency: "CHF",
    },
    shippingDestination: {
      "@type": "DefinedRegion",
      addressCountry: ["CH", "LI"],
    },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      businessDays: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "https://schema.org/Monday",
          "https://schema.org/Tuesday",
          "https://schema.org/Wednesday",
          "https://schema.org/Thursday",
          "https://schema.org/Friday",
        ],
      },
      cutoffTime: "14:00",
      handlingTime: {
        "@type": "QuantitativeValue",
        minValue: 1,
        maxValue: 2,
      },
    },
  };

  // Merchant return policy
  jsonLd.hasMerchantReturnPolicy = {
    "@type": "MerchantReturnPolicy",
    applicableCountry: ["CH", "LI"],
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: c.returnPeriodDays,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: c.returnShippingCostPolicy.includes("Kostenlose")
      ? "https://schema.org/FreeReturn"
      : "https://schema.org/ReturnFeesCustomerResponsibility",
    refundType: "https://schema.org/FullRefund",
  };

  // Only add aggregateRating if REAL verified reviews exist
  // Currently we don't have a verified review system, so we OMIT this
  // Uncomment below ONLY when real reviews are implemented:
  /*
  if (product.rating && product.reviewsCount && (product as any).reviews_verified) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
      bestRating: 5,
      worstRating: 1,
    };
  }
  */

  return jsonLd;
}

// Breadcrumb JSON-LD
function generateBreadcrumbJsonLd(product: typeof productsData[0], c: typeof companyConfig) {
  const siteUrl = c.siteUrl.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: `${siteUrl}/produkte`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: `${siteUrl}/produkt/${product.id}`,
      },
    ],
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = productsData.find((p) => p.id === id);
  const c = companyConfig;

  if (!product) {
    notFound();
  }

  const productJsonLd = generateProductJsonLd(product, c);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(product, c);

  // Category label mapping for display
  const categoryNames: Record<string, string> = {
    VILLE: "City-E-Bikes",
    VTC: "Trekking-E-Bikes",
    VTT: "E-Mountainbikes",
    ACCESSOIRES: "Zubehör",
    VETEMENTS: "Fahrradbekleidung",
    ENFANTS: "Kinderfahrräder",
    Kleidung: "Fahrradbekleidung",
    kinder: "Kinderfahrräder",
  };

  const categoryLabel = categoryNames[product.category] || product.categoryLabel;

  return (
    <div className="velora-product-detail-page">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="velora-detail-container">
        {/* Fil d'ariane / Breadcrumb */}
        <nav className="velora-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" itemProp="item">
                <span itemProp="name">Startseite</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/produkte" itemProp="item">
                <span itemProp="name">Shop</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" aria-current="page">
              <Link href={`/kategorie/${product.category.toLowerCase()}`} itemProp="item">
                <span itemProp="name">{categoryLabel}</span>
              </Link>
              <meta itemProp="position" content="3" />
            </li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" aria-current="page">
              <span itemProp="name">{product.title}</span>
              <meta itemProp="position" content="4" />
            </li>
          </ol>
        </nav>

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
            <span className="velora-detail-brand" itemProp="brand" itemScope itemType="https://schema.org/Brand">
              <span itemProp="name">{product.brand}</span>
            </span>
            <h1 className="velora-detail-title" itemProp="name">{product.title}</h1>

            {/* REMOVED: Fake reviews display - only show if real verified reviews exist */}
            {/*
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
            */}

            {product.isDraft && (
              <p className="catalog-draft-notice" role="note">
                Lieferbarkeit und Verkaufskonditionen bitte vor dem Verkauf
                beim Lieferanten bestätigen.
              </p>
            )}

            <div className="velora-detail-price-box">
              <span className="velora-detail-current-price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <span itemProp="priceCurrency" content="CHF">CHF </span>
                <span itemProp="price" content={product.price.toFixed(2)}>{product.price.toFixed(2)}</span>
                <meta itemProp="availability" content={product.isDraft ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"} />
              </span>
              {product.oldPrice && (product as any).price_verified ? (
                <span className="velora-detail-old-price">CHF {product.oldPrice.toFixed(2)}</span>
              ) : product.oldPrice ? (
                <span className="velora-detail-old-price-unverified" style={{ opacity: 0.5, fontSize: "0.875rem" }}>
                  CHF {product.oldPrice.toFixed(2)} (unverifizierter Preis)
                </span>
              ) : null}
            </div>

            <p className="velora-detail-desc" itemProp="description">{product.description}</p>

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

            {/* Garanties & Avantages Livraison Gratuite */}
            <div className="velora-detail-trust-box">
              <div className="velora-trust-item">
                <i className="fa-solid fa-truck-fast"></i>
                <div>
                  <strong>{c.shippingCarrier} (0.00 CHF)</strong>
                  <span>Kostenlose Lieferung in der ganzen Schweiz & Liechtenstein</span>
                </div>
              </div>
              <div className="velora-trust-item">
                <i className="fa-solid fa-clock"></i>
                <div>
                  <strong>Lieferzeit</strong>
                  <span>{c.deliveryTimeText}</span>
                </div>
              </div>
              <div className="velora-trust-item">
                <i className="fa-solid fa-phone"></i>
                <div>
                  <strong>Telefonische Beratung</strong>
                  <span>
                    Fragen? Rufen Sie uns an:{" "}
                    <a href={`tel:${c.phoneRaw}`}>{c.phone}</a>
                  </span>
                </div>
              </div>
            </div>

            {/* Détails techniques pour vélos */}
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

            {/* Additional product attributes for Google Merchant Center (apparel, kids bikes) */}
            {(product.category === "Kleidung" || product.category === "kinder") && (
              <div className="velora-detail-full-specs">
                <h3>Zusatzinformationen</h3>
                <ul>
                  {(product as any).color && <li><strong>Farbe:</strong> {(product as any).color}</li>}
                  {(product as any).size && <li><strong>Grösse:</strong> {(product as any).size}</li>}
                  {(product as any).gender && <li><strong>Geschlecht:</strong> {(product as any).gender}</li>}
                  {(product as any).age_group && <li><strong>Altersgruppe:</strong> {(product as any).age_group}</li>}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
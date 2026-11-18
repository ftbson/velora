import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { productsData, type ProductCategory } from "@/data/products";
import { companyConfig, getSiteUrl } from "@/config/company";
import type { Metadata } from "next";

const c = companyConfig;
const siteUrl = c.siteUrl.replace(/\/$/, "");

// Breadcrumb JSON-LD for category pages
function generateCategoryBreadcrumbJsonLd(categorySlug: string, c: typeof companyConfig) {
  const baseUrl = c.siteUrl.replace(/\/$/, "");
  const categoriesMap: Record<string, string> = {
    stadt: "City-E-Bikes",
    trekking: "Trekking-E-Bikes",
    mountainbike: "E-Mountainbikes",
    zubehoer: "Fahrradzubehör",
    bekleidung: "Fahrradbekleidung",
    kinder: "Kinderfahrräder",
  };
  const categoryLabel = categoriesMap[categorySlug] || categorySlug;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: `${baseUrl}/produkte`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryLabel,
        item: `${baseUrl}/kategorie/${categorySlug}`,
      },
    ],
  };
}

const categories = {
  stadt: { label: "City-E-Bikes", code: "VILLE" },
  trekking: { label: "Trekking-E-Bikes", code: "VTC" },
  mountainbike: { label: "E-Mountainbikes", code: "VTT" },
  zubehoer: { label: "Fahrradzubehör", code: "ACCESSOIRES" },
  bekleidung: { label: "Fahrradbekleidung", code: "Kleidung" },
  kinder: { label: "Kinderfahrräder", code: "kinder" },
} as const satisfies Record<string, { label: string; code: ProductCategory }>;

type CategorySlug = keyof typeof categories;

function isCategorySlug(value: string): value is CategorySlug {
  return Object.hasOwn(categories, value);
}

export function generateStaticParams() {
  return Object.keys(categories).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isCategorySlug(category)) {
    return {
      title: "Kategorie nicht gefunden",
      robots: "noindex",
    };
  }
  const selectedCategory = categories[category];
  const pageUrl = `${siteUrl}/kategorie/${category}`;
  return {
    title: selectedCategory.label,
    description: `Entdecken Sie ${selectedCategory.label.toLowerCase()} bei VELORA. ${productsData.filter(p => p.category === selectedCategory.code).length} Modelle verfügbar. Kostenloser Versand Schweiz & Liechtenstein.`,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: selectedCategory.label,
      description: `VELORA – ${selectedCategory.label}. Kostenloser Versand in die Schweiz und nach Liechtenstein.`,
      url: pageUrl,
      siteName: c.brandName,
      type: "website",
      locale: "de_CH",
      images: [
        {
          url: `${siteUrl}/img/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: `${selectedCategory.label} – VELORA`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: selectedCategory.label,
      description: `VELORA – ${selectedCategory.label}. Kostenloser Versand Schweiz & Liechtenstein.`,
      images: [`${siteUrl}/img/og-default.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isCategorySlug(category)) notFound();

  const selectedCategory = categories[category];
  const products = productsData.filter(
    (product) => product.category === selectedCategory.code,
  );

  const breadcrumbJsonLd = generateCategoryBreadcrumbJsonLd(category, c);

  return (
    <main className="catalog-page">
      {/* JSON-LD BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <header className="catalog-heading">
        <p className="storefront-eyebrow">UNSERE KATEGORIEN</p>
        <h1>{selectedCategory.label}</h1>
        <p>{products.length} Produkte in dieser Kategorie</p>
      </header>
      <div className="storefront-product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="storefront-actions">
        <Link href="/kategorie" className="storefront-secondary-link">
          Alle Kategorien
        </Link>
        <Link href="/produkte" className="storefront-primary-link">
          Gesamtes Sortiment
          <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
import CategorySection from "@/components/Categories";
import Link from "next/link";
import { companyConfig, getSiteUrl } from "@/config/company";
import type { Metadata } from "next";

const c = companyConfig;
const siteUrl = c.siteUrl.replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Kategorien",
  description: "Entdecken Sie alle Produktkategorien bei VELORA – City-E-Bikes, Trekking-E-Bikes, E-Mountainbikes, Zubehör, Bekleidung und Kinderfahrräder. Kostenloser Versand Schweiz & Liechtenstein.",
  alternates: {
    canonical: `${siteUrl}/kategorie`,
  },
  openGraph: {
    title: "Kategorien",
    description: "VELORA – Alle Produktkategorien: E-Bikes, Zubehör, Bekleidung. Kostenloser Versand Schweiz & Liechtenstein.",
    url: `${siteUrl}/kategorie`,
    siteName: c.brandName,
    type: "website",
    locale: "de_CH",
    images: [
      {
        url: `${siteUrl}/img/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "VELORA Produktkategorien",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kategorien",
    description: "VELORA – Alle Produktkategorien. Kostenloser Versand Schweiz & Liechtenstein.",
    images: [`${siteUrl}/img/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CategoriesPage() {
  return (
    <main className="category-index-page">
      <CategorySection />
      <div className="storefront-actions category-index-action">
        <Link href="/produkte" className="storefront-primary-link">
          Alle Produkte ansehen
          <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
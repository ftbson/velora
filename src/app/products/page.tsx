import { Suspense } from "react";
import ShopGrid from "@/components/ShopGrid";
import { companyConfig, getSiteUrl } from "@/config/company";
import type { Metadata } from "next";

const c = companyConfig;
const siteUrl = getSiteUrl("");

export const metadata: Metadata = {
  title: "Alle Produkte | VELORA",
  description: "Entdecken Sie Fahrräder, Kinderfahrräder, Fahrradzubehör und Radbekleidung bei VELORA. Kostenloser Versand Schweiz & Liechtenstein.",
  alternates: {
    canonical: `${siteUrl}/produkte`,
  },
  openGraph: {
    title: "Alle Produkte | VELORA",
    description: "VELORA – Fahrräder, Zubehör, Bekleidung. Kostenloser Versand Schweiz & Liechtenstein.",
    url: `${siteUrl}/produkte`,
    siteName: c.brandName,
    type: "website",
    locale: "de_CH",
    images: [
      {
        url: `${siteUrl}/img/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "VELORA Alle Produkte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alle Produkte | VELORA",
    description: "Entdecken Sie Fahrräder, Zubehör, Bekleidung. Kostenloser Versand Schweiz & Liechtenstein.",
    images: [`${siteUrl}/img/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; search?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const query = resolvedParams.q || resolvedParams.search || "";

  return (
    <main>
      <Suspense fallback={<div className="catalog-loading">Produkte werden geladen...</div>}>
        <ShopGrid initialQuery={query} />
      </Suspense>
    </main>
  );
}

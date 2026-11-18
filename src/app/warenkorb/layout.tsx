import { companyConfig, getSiteUrl } from "@/config/company";
import type { Metadata } from "next";

const c = companyConfig;
const siteUrl = getSiteUrl("");

export const metadata: Metadata = {
  title: "Warenkorb | VELORA",
  description: "Ihr Warenkorb bei VELORA – Produkte prüfen, Mengen anpassen und zur Kasse gehen. Kostenloser Versand Schweiz & Liechtenstein.",
  alternates: {
    canonical: `${siteUrl}/warenkorb`,
  },
  openGraph: {
    title: "Warenkorb | VELORA",
    description: "VELORA – Ihr Warenkorb. Kostenloser Versand Schweiz & Liechtenstein.",
    url: `${siteUrl}/warenkorb`,
    siteName: c.brandName,
    type: "website",
    locale: "de_CH",
    images: [
      {
        url: `${siteUrl}/img/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "VELORA Warenkorb",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Warenkorb | VELORA",
    description: "Ihr Warenkorb bei VELORA.",
    images: [`${siteUrl}/img/og-default.jpg`],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
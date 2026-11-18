import { companyConfig, getSiteUrl } from "@/config/company";
import type { Metadata } from "next";

const c = companyConfig;
const siteUrl = getSiteUrl("");

export const metadata: Metadata = {
  title: "Wunschliste | VELORA",
  description: "Ihre persönliche Wunschliste bei VELORA – gespeicherte Produkte für später. Kostenloser Versand Schweiz & Liechtenstein.",
  alternates: {
    canonical: `${siteUrl}/wunschliste`,
  },
  openGraph: {
    title: "Wunschliste | VELORA",
    description: "VELORA – Ihre Wunschliste. Kostenloser Versand Schweiz & Liechtenstein.",
    url: `${siteUrl}/wunschliste`,
    siteName: c.brandName,
    type: "website",
    locale: "de_CH",
    images: [
      {
        url: `${siteUrl}/img/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "VELORA Wunschliste",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wunschliste | VELORA",
    description: "Ihre Wunschliste bei VELORA.",
    images: [`${siteUrl}/img/og-default.jpg`],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
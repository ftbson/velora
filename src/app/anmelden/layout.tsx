import { companyConfig, getSiteUrl } from "@/config/company";
import type { Metadata } from "next";

const c = companyConfig;
const siteUrl = getSiteUrl("");

export const metadata: Metadata = {
  title: "Anmelden | VELORA",
  description: "Melden Sie sich bei Ihrem VELORA Konto an oder erstellen Sie ein neues Konto für schnelleres Checkout und Bestellübersicht.",
  alternates: {
    canonical: `${siteUrl}/anmelden`,
  },
  openGraph: {
    title: "Anmelden | VELORA",
    description: "VELORA – Anmelden oder registrieren. Kostenloser Versand Schweiz & Liechtenstein.",
    url: `${siteUrl}/anmelden`,
    siteName: c.brandName,
    type: "website",
    locale: "de_CH",
    images: [
      {
        url: `${siteUrl}/img/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "VELORA Anmelden",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anmelden | VELORA",
    description: "Melden Sie sich bei Ihrem VELORA Konto an.",
    images: [`${siteUrl}/img/og-default.jpg`],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
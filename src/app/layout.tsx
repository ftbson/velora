import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";
import "./layout.css";
import ClientLayoutShell from "@/components/ClientLayoutShell";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { companyConfig, getSiteUrl } from "@/config/company";

const c = companyConfig;
const siteUrl = c.siteUrl.replace(/\/$/, "");

// JSON-LD Organization Schema
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: c.brandName,
  url: siteUrl,
  logo: `${siteUrl}/img/logo.png`,
  description: "VELORA – Ihr Schweizer Fachhändler für Premium E-Bikes, Fahrräder, Zubehör und Bekleidung. Kostenloser Versand in die Schweiz und nach Liechtenstein.",
  address: {
    "@type": "PostalAddress",
    streetAddress: c.street || "",
    postalCode: c.postalCode || "",
    addressLocality: c.city || "",
    addressCountry: c.country || "CH",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: c.phoneRaw,
    contactType: "customer service",
    availableLanguage: ["German"],
    hoursAvailable: c.openingHours ? `Mo-Fr 08:30-18:00, Sa 09:00-16:00` : "",
  },
  email: c.email,
  telephone: c.phoneRaw,
  sameAs: [],
  priceRange: "CHF 30 - CHF 8000",
  currenciesAccepted: "CHF",
  paymentAccepted: "Cash, Credit Card, TWINT, Bank Transfer",
  areaServed: ["CH", "LI"],
};

// JSON-LD Website Schema
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: c.brandName,
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/suche?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "de-CH",
};

// Configuration SEO Avancée - VELORA Switzerland (E-Bikes)
export const metadata: Metadata = {
  title: {
    default: `${c.brandName} - Premium E-Bikes & Elektrofahrräder Schweiz`,
    template: `%s | ${c.brandName}`,
  },
  description:
    "Entdecken Sie hochwertige E-Bikes und Elektrofahrräder von VELORA. Schweizer Fachhändler mit kostenloser Lieferung in die Schweiz und nach Liechtenstein.",
  authors: [{ name: c.brandName }],
  creator: c.brandName,
  publisher: c.brandName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${c.brandName} - Premium E-Bikes & Elektrofahrräder Schweiz`,
    description:
      "Schweizer Fachhändler für E-Bikes: City, Trekking, Mountainbikes. Kostenlose Lieferung CH & LI. Top-Marken: CUBE, Benno, O2FEEL, Granville, ORBEA.",
    url: siteUrl,
    siteName: c.brandName,
    images: [
      {
        url: `${siteUrl}/img/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: `${c.brandName} – Schweizer E-Bike Fachhändler`,
      },
    ],
    locale: "de_CH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${c.brandName} - Schweizer Premium E-Bikes`,
    description:
      "Erleben Sie die Zukunft der Mobilität mit den neuen E-Bikes von VELORA. Kostenloser Versand in die Schweiz & Liechtenstein.",
    images: [`${siteUrl}/img/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/img/favicon.ico",
    shortcut: "/img/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  other: {
    "script:ld+json:organization": JSON.stringify(organizationJsonLd),
    "script:ld+json:website": JSON.stringify(websiteJsonLd),
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de-CH">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        {/* JSON-LD structured data injected via metadata.other above */}
      </head>
      <body>
        <CartProvider>
          <AuthProvider>
            <ClientLayoutShell>{children}</ClientLayoutShell>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
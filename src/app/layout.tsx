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

// Only include "Schweizer" references if country and uid are filled
const isSwissShop = c.country && c.uid;
const shopDescription = isSwissShop
  ? `${c.brandName} – Ihr Schweizer Onlineshop für E-Bikes, Fahrräder, Zubehör und Bekleidung. Kostenloser Versand in die Schweiz und nach Liechtenstein.`
  : `${c.brandName} – Onlineshop für E-Bikes, Fahrräder, Zubehör und Bekleidung. Kostenloser Versand in die Schweiz und nach Liechtenstein.`;

// Build JSON-LD Organization dynamically from config
function buildOrganizationJsonLd() {
  const org: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: c.brandName,
    url: siteUrl,
    logo: `${siteUrl}/img/logo.png`,
    description: shopDescription,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: c.phoneRaw,
      contactType: "customer service",
      availableLanguage: ["German"],
      hoursAvailable: c.openingHours || undefined,
    },
    email: c.email,
    telephone: c.phoneRaw,
    currenciesAccepted: "CHF",
    paymentAccepted: c.paymentProviders.join(", "),
    areaServed: ["CH", "LI"],
  };

  // Only add address if all required fields are present
  if (c.street && c.postalCode && c.city) {
    org.address = {
      "@type": "PostalAddress",
      streetAddress: c.street,
      postalCode: c.postalCode,
      addressLocality: c.city,
      addressCountry: c.country || "CH",
    };
  }

  // Only add sameAs if there are real social URLs
  if (c.socialLinks && c.socialLinks.length > 0) {
    org.sameAs = c.socialLinks;
  }

  return org;
}

const organizationJsonLd = buildOrganizationJsonLd();

// JSON-LD Website Schema
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: c.brandName,
  url: siteUrl,
  inLanguage: "de-CH",
};

// Configuration SEO Avancée - VELORA Switzerland (E-Bikes)
export const metadata: Metadata = {
  title: {
    default: `${c.brandName} – E-Bikes, Fahrräder, Zubehör & Bekleidung | Schweiz`,
    template: `%s | ${c.brandName}`,
  },
  description: shopDescription,
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
    title: `${c.brandName} – E-Bikes, Fahrräder, Zubehör & Bekleidung`,
    description: isSwissShop
      ? `Onlineshop für E-Bikes (City, Trekking, Mountainbike), Fahrradzubehör und Radbekleidung. Kostenloser Versand CH & LI.`
      : `Onlineshop für E-Bikes (City, Trekking, Mountainbike), Fahrradzubehör und Radbekleidung. Kostenloser Versand CH & LI.`,
    url: siteUrl,
    siteName: c.brandName,
    images: [
      {
        url: `${siteUrl}/img/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: `${c.brandName} – E-Bike Shop`,
      },
    ],
    locale: "de_CH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${c.brandName} – E-Bike Shop`,
    description:
      `E-Bikes, Fahrräder, Zubehör und Bekleidung. Kostenloser Versand in die Schweiz & Liechtenstein.`,
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
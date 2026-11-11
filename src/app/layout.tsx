import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import "./layout.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

// Configuration SEO Avancée - VELORA Switzerland (E-Bikes)
export const metadata: Metadata = {
  title: {
    default: "VELORA - Premium E-Bikes & Elektrofahrräder Schweiz",
    template: "%s | VELORA",
  },
  description:
    "Entdecken Sie hochwertige E-Bikes und Elektrofahrräder von VELORA. Schweizer Qualität, nachhaltige Mobilität und erstklassiger Service.",
  keywords: [
    "E-Bike Schweiz",
    "Elektrofahrrad kaufen",
    "VELORA E-Bikes",
    "Swiss E-Bike",
    "Pedelec Schweiz",
    "E-Mountainbike",
    "City E-Bike",
    "Nachhaltige Mobilität",
  ],
  authors: [{ name: "VELORA" }],
  creator: "VELORA",
  publisher: "VELORA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://velora.ch"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VELORA - Premium E-Bikes & Elektrofahrräder Schweiz",
    description:
      "Schweizer Qualität und erstklassige Leistung: Entdecken Sie die neuen VELORA E-Bikes für Stadt und Berge.",
    url: "https://velora.ch",
    siteName: "VELORA",
    images: [
      {
        url: "/img/logo.png",
        width: 800,
        height: 600,
        alt: "VELORA Logo",
      },
    ],
    locale: "de_CH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VELORA - Schweizer Premium E-Bikes",
    description:
      "Erleben Sie die Zukunft der Mobilität mit den neuen E-Bikes von VELORA.",
    images: ["/img/logo.png"],
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
    icon: "/img/logo.png",
    shortcut: "/img/logo.png",
    apple: "/img/logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Récupération du pathname pour exclure la Nav & Footer sur les routes /admin
  const headersList = await headers();
  const pathname = headersList.get("x-current-path") || headersList.get("next-url") || "";
  
  const isAdminRoute = pathname.startsWith("/admin");

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
      </head>
      <body>
        <CartProvider>
          <AuthProvider>
            <div
              className="app-container"
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              {!isAdminRoute && <Navbar />}
              <main className="main-content" style={{ flex: 1 }}>
                {children}
              </main>
              {!isAdminRoute && <Footer />}
              {!isAdminRoute && <CookieBanner />}
            </div>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
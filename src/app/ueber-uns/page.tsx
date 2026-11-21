import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { companyConfig, getFormattedAddress, getSiteUrl } from "@/config/company";

const c = companyConfig;
const siteUrl = getSiteUrl("");
const address = getFormattedAddress();

export const metadata: Metadata = {
  title: "Über uns",
  description: `${c.brandName} – ${c.brandName} bietet E-Bikes, Fahrräder, Zubehör und Bekleidung. ${c.deliveryTimeText ? `Lieferzeit: ${c.deliveryTimeText}. ` : ""}${c.returnPeriodDays && c.returnPolicyAccepted ? `${c.returnPeriodDays} Tage Widerrufsrecht. ` : ""}Kostenloser Versand Schweiz & Liechtenstein.`,
  alternates: {
    canonical: getSiteUrl("/ueber-uns"),
  },
  openGraph: {
    title: "Über uns",
    description: `${c.brandName} – E-Bikes, Fahrräder, Zubehör, Bekleidung. ${c.deliveryTimeText ? `Lieferzeit: ${c.deliveryTimeText}. ` : ""}Kostenloser Versand Schweiz & Liechtenstein.`,
    url: getSiteUrl("/ueber-uns"),
    siteName: c.brandName,
    type: "website",
    locale: "de_CH",
    images: [
      {
        url: `${siteUrl}/img/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: `${c.brandName} – Über uns`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Über uns",
    description: `${c.brandName} – E-Bikes, Fahrräder, Zubehör, Bekleidung. Kostenloser Versand Schweiz & Liechtenstein.`,
    images: [`${siteUrl}/img/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function hasCompanyInfo(): boolean {
  return !!(c.legalName || c.street || c.postalCode || c.city);
}

function hasReturnPolicy(): boolean {
  return c.returnPolicyAccepted === true && !!c.returnPeriodDays;
}

function hasPaymentInfo(): boolean {
  return c.paymentProviders.length > 0;
}

function hasShippingInfo(): boolean {
  return !!(c.shippingCarrier || c.deliveryTimeText);
}

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Über {c.brandName}</h1>
          <p className="about-lead">
            {c.brandName} bietet E-Bikes, Fahrräder, Zubehör und Radbekleidung.
            Wir liefern versandkostenfrei in die gesamte Schweiz und nach Liechtenstein.
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="about-grid">
          <div className="about-text">
            <h2>Unser Sortiment</h2>
            <p>
              {c.brandName} führt City-E-Bikes, Trekking-E-Bikes, E-Mountainbikes sowie passendes Zubehör
              und funktionale Bekleidung für Alltag, Tour und Gelände.
            </p>

            {c.authorizedDealer && (
              <div className="about-authorized">
                <h3>Offizieller Fachhändler</h3>
                <p>
                  {c.brandName} ist autorisierter Fachhändler für folgende Marken:
                </p>
                <ul>
                  {c.authorizedBrands.length > 0 ? (
                    c.authorizedBrands.map((brand) => <li key={brand}>{brand}</li>)
                  ) : (
                    <li>CUBE, Benno Bikes, O2FEEL, Granville</li>
                  )}
                </ul>
              </div>
            )}

            {hasCompanyInfo() && (
              <>
                <h2>Standort & Kontakt</h2>
                {address ? (
                  <address>
                    <strong>{c.legalName || c.brandName}</strong><br />
                    {address.replace(/, /g, "<br />")}
                  </address>
                ) : (
                  <p>
                    <em>Standortangaben werden ergänzt – siehe <Link href="/legal/impressum">Impressum</Link>.</em>
                  </p>
                )}

                <div className="about-contact-links">
                  <a href={`mailto:${c.email}`}>{c.email}</a>
                  <a href={`tel:${c.phoneRaw}`}>{c.phone}</a>
                </div>

                {c.openingHours && (
                  <div className="about-hours">
                    <h3>Öffnungszeiten (Beratung)</h3>
                    <p>{c.openingHours}</p>
                  </div>
                )}
              </>
            )}

            {hasShippingInfo() && (
              <div className="about-shipping-info">
                <h3>Versand & Lieferung</h3>
                {c.deliveryTimeText && (
                  <p><strong>Lieferzeit:</strong> {c.deliveryTimeText}</p>
                )}
                {c.shippingCarrier && (
                  <p><strong>Versanddienstleister:</strong> {c.shippingCarrier}</p>
                )}
                <p><strong>Versandkosten:</strong> Kostenlos in der Schweiz & Liechtenstein</p>
              </div>
            )}

            {hasPaymentInfo() && (
              <div className="about-payment-info">
                <h3>Zahlungsarten</h3>
                <ul>
                  {c.paymentProviders.map((provider, idx) => (
                    <li key={idx}>{provider}</li>
                  ))}
                </ul>
              </div>
            )}

            {hasReturnPolicy() && (
              <div className="about-return-info">
                <h3>Rückgabe & Widerruf</h3>
                <p>
                  <strong>{c.returnPeriodDays} Tage</strong> Widerrufsrecht.
                  {c.returnShippingCostPolicy && <br />}
                  {c.returnShippingCostPolicy}
                </p>
              </div>
            )}
          </div>

          <div className="about-visual">
            <div className="about-image-wrapper">
              <Image
                src="/img/about.jpg"
                alt={`${c.brandName} – E-Bike Shop`}
                width={600}
                height={450}
                priority
                className="about-main-image"
              />
            </div>

            <div className="about-features">
              {hasShippingInfo() && (
                <div className="feature-card">
                  <i className="fa-solid fa-truck-fast"></i>
                  <h4>Kostenloser Versand</h4>
                  <p>In die ganze Schweiz & Liechtenstein</p>
                </div>
              )}

              <div className="feature-card">
                <i className="fa-solid fa-headset"></i>
                <h4>Persönliche Beratung</h4>
                <p>Telefonisch & per E-Mail</p>
              </div>

              {hasPaymentInfo() && (
                <div className="feature-card">
                  <i className="fa-solid fa-shield-halved"></i>
                  <h4>Sicherer Kauf</h4>
                  <p>{c.paymentProviders.join(", ")}</p>
                </div>
              )}

              {hasReturnPolicy() && (
                <div className="feature-card">
                  <i className="fa-solid fa-rotate-left"></i>
                  <h4>Einfache Retouren</h4>
                  <p>{c.returnPeriodDays} Tage Widerrufsrecht</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <h2>Bereit für Ihre nächste Tour?</h2>
        <p>Entdecken Sie unser Sortiment an E-Bikes, Zubehör und Bekleidung.</p>
        <div className="about-cta-buttons">
          <Link href="/produkte" className="btn-primary">
            Zum Shop
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </Link>
          <Link href="/kontakt" className="btn-secondary">
            Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </main>
  );
}
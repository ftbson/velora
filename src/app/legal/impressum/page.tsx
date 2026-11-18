import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { companyConfig, getFormattedAddress, getSiteUrl } from "@/config/company";

const c = companyConfig;
const siteUrl = getSiteUrl("");

export const metadata: Metadata = {
  title: "Impressum",
  description: "Rechtliche Angaben zum Anbieter VELORA – Firma, Adresse, Kontakt, Registereinträge und verantwortliche Person.",
  alternates: {
    canonical: getSiteUrl("/legal/impressum"),
  },
  openGraph: {
    title: "Impressum",
    description: "VELORA – Impressum mit rechtlichen Angaben zu Firma, Adresse, Kontakt und Registereinträgen.",
    url: getSiteUrl("/legal/impressum"),
    siteName: c.brandName,
    type: "website",
    locale: "de_CH",
    images: [
      {
        url: `${siteUrl}/img/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "VELORA Impressum",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Impressum",
    description: "Rechtliche Angaben zum Anbieter VELORA.",
    images: [`${siteUrl}/img/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Helper to check if Anbieter section should be shown
function hasAnbieterInfo(): boolean {
  return !!(c.legalName && c.street && c.postalCode && c.city);
}

export default function ImpressumPage() {
  const address = getFormattedAddress();

  return (
    <LegalDocument
      title="Impressum"
      description="Angaben zum Anbieter, Kontakt und Registereinträgen gemäss Schweizer Recht."
    >
      {/* Anbieter section - only if all required fields are filled */}
      {hasAnbieterInfo() && (
        <section className="legal-section">
          <h2>Anbieter</h2>
          <p>
            {c.legalName && <strong>{c.legalName}</strong>}
            {c.legalName && c.legalForm && <br />}
            {c.legalForm && <span>{c.legalForm}</span>}
            {address && (
              <>
                {(c.legalName || c.legalForm) && <br />}
                <span>{address}</span>
              </>
            )}
          </p>
        </section>
      )}

      {c.responsiblePerson && (
        <section className="legal-section">
          <h2>Vertretungsberechtigte Person</h2>
          <p>{c.responsiblePerson}</p>
        </section>
      )}

      <section className="legal-section">
        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href={`mailto:${c.email}`}><strong>{c.email}</strong></a>
          <br />
          Telefon: <a href={`tel:${c.phoneRaw}`}><strong>{c.phone}</strong></a>
          {c.openingHours && <br />}
          {c.openingHours && <span>Öffnungszeiten: {c.openingHours}</span>}
        </p>
      </section>

      {(c.uid || c.commercialRegister) && (
        <section className="legal-section">
          <h2>Handelsregister & UID</h2>
          <p>
            {c.uid && (
              <>UID / IDE: <strong>{c.uid}</strong></>
            )}
            {c.uid && c.commercialRegister && <br />}
            {c.commercialRegister && (
              <>Handelsregister: <strong>{c.commercialRegister}</strong></>
            )}
          </p>
        </section>
      )}

      <section className="legal-section">
        <h2>Mehrwertsteuer</h2>
        <p>
          {c.vatNumber ? (
            <>Mehrwertsteuernummer: <strong>{c.vatNumber}</strong></>
          ) : c.vatExempt ? (
            <span>Nicht mehrwertsteuerpflichtig (Kleinunternehmer / OSS)</span>
          ) : (
            <span>Nicht mehrwertsteuerpflichtig</span>
          )}
        </p>
      </section>

      {(c.responsiblePerson || address) && (
        <section className="legal-section">
          <h2>Verantwortlich für den Inhalt</h2>
          <p>
            {c.responsiblePerson && <strong>{c.responsiblePerson}</strong>}
            {c.responsiblePerson && address && <br />}
            {address}
          </p>
        </section>
      )}

      {/* OS platform link removed - EU-specific, not applicable for CH-only shop */}

    </LegalDocument>
  );
}
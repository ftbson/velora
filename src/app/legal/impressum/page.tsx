import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { companyConfig, getFormattedAddress, getSiteUrl } from "@/config/company";

const c = companyConfig;
const siteUrl = getSiteUrl("");
const address = getFormattedAddress();

export const metadata: Metadata = {
  title: "Impressum",
  description: c.brandName ? `Rechtliche Angaben zum Anbieter ${c.brandName} – Firma, Adresse, Kontakt, Registereinträge` : "Impressum",
  alternates: {
    canonical: getSiteUrl("/legal/impressum"),
  },
  openGraph: {
    title: "Impressum",
    description: c.brandName ? `${c.brandName} – Impressum` : "Impressum",
    url: getSiteUrl("/legal/impressum"),
    siteName: c.brandName,
    type: "website",
    locale: "de_CH",
    images: [
      {
        url: `${siteUrl}/img/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: `${c.brandName} Impressum`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Impressum",
    description: c.brandName ? `Rechtliche Angaben zum Anbieter ${c.brandName}` : "Impressum",
    images: [`${siteUrl}/img/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function hasAnbieterInfo(): boolean {
  return !!(c.legalName && c.street && c.postalCode && c.city);
}

function hasSupervisoryAuthority(): boolean {
  return !!c.supervisoryAuthority;
}

export default function ImpressumPage() {
  return (
    <LegalDocument
      title="Impressum"
      description="Angaben zum Anbieter, Kontakt und Registereinträgen gemäss Schweizer Recht."
    >
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
          ) : c.vatExempt === true ? (
            <span>nicht mehrwertsteuerpflichtig</span>
          ) : (
            <span>Angaben folgen</span>
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

      {hasSupervisoryAuthority() && (
        <section className="legal-section">
          <h2>Aufsichtsbehörde</h2>
          <p>{c.supervisoryAuthority}</p>
        </section>
      )}

      {c.osPlatformUrl && (
        <section className="legal-section">
          <h2>Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            <a href={c.osPlatformUrl} target="_blank" rel="noopener noreferrer">
              {c.osPlatformUrl}
            </a>
          </p>
        </section>
      )}

      {!hasAnbieterInfo() && (
        <section className="legal-section">
          <p>Das Impressum wird vollständig angezeigt, sobald alle erforderlichen Firmenangaben in der Konfiguration hinterlegt sind.</p>
          <p>Bitte füllen Sie die Datei <code>src/config/company.ts</code> vollständig aus.</p>
        </section>
      )}
    </LegalDocument>
  );
}
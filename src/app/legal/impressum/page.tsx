import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { companyConfig, getFormattedAddress } from "@/config/company";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Rechtliche Angaben zum Anbieter VELORA – Firma, Adresse, Kontakt, Registereinträge und verantwortliche Person.",
};

export default function ImpressumPage() {
  const c = companyConfig;
  const address = getFormattedAddress();

  return (
    <LegalDocument
      title="Impressum"
      description="Angaben zum Anbieter, Kontakt und Registereinträgen gemäss Schweizer Recht."
    >
      <section className="legal-section">
        <h2>Anbieter</h2>
        <p>
          {c.legalName ? <strong>{c.legalName}</strong> : <em className="missing-field">[Raison sociale – À REMPLIR dans company.ts]</em>}
          <br />
          {c.legalForm ? c.legalForm : <em className="missing-field">[Rechtsform – À REMPLIR]</em>}
          <br />
          {address || <em className="missing-field">[Adresse complète – À REMPLIR]</em>}
        </p>
      </section>

      <section className="legal-section">
        <h2>Vertretungsberechtigte Person</h2>
        <p>
          {c.responsiblePerson ? c.responsiblePerson : <em className="missing-field">[Name der vertretungsberechtigten Person – À REMPLIR]</em>}
        </p>
      </section>

      <section className="legal-section">
        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href={`mailto:${c.email}`}><strong>{c.email}</strong></a>
          <br />
          Telefon: <a href={`tel:${c.phoneRaw}`}><strong>{c.phone}</strong></a>
          <br />
          {c.openingHours && <span>Öffnungszeiten: {c.openingHours}</span>}
        </p>
      </section>

      <section className="legal-section">
        <h2>Handelsregister & UID</h2>
        <p>
          {c.uid ? (
            <>UID / IDE: <strong>{c.uid}</strong></>
          ) : (
            <em className="missing-field">[UID/IDE – À REMPLIR]</em>
          )}
          <br />
          {c.commercialRegister ? (
            <>Handelsregister: <strong>{c.commercialRegister}</strong></>
          ) : (
            <em className="missing-field">[Handelsregistereintrag – À REMPLIR]</em>
          )}
        </p>
      </section>

      <section className="legal-section">
        <h2>Mehrwertsteuer</h2>
        <p>
          {c.vatNumber ? (
            <>Mehrwertsteuernummer: <strong>{c.vatNumber}</strong></>
          ) : (
            <span>Nicht mehrwertsteuerpflichtig oder <em className="missing-field">[MWST-Nummer – À REMPLIR falls zutreffend]</em></span>
          )}
        </p>
      </section>

      <section className="legal-section">
        <h2>Verantwortlich für den Inhalt</h2>
        <p>
          {c.responsiblePerson ? <strong>{c.responsiblePerson}</strong> : <em className="missing-field">[Verantwortliche Person – À REMPLIR]</em>}
          <br />
          {address}
        </p>
      </section>

      <section className="legal-section">
        <h2>Aufsichtsbehörde (falls reguliert)</h2>
        <p>
          Keine branchenspezifische Aufsichtsbehörde für den Online-Handel mit Fahrrädern und Zubehör.
        </p>
      </section>

      <section className="legal-section">
        <h2>Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
          <br />
          Wir sind nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>
    </LegalDocument>
  );
}
import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieter- und Kontaktangaben von VELORA.",
};

export default function ImpressumPage() {
  return (
    <LegalDocument
      title="Impressum"
      description="Angaben zum Anbieter und Kontaktmöglichkeiten."
    >
      <section className="legal-section">
        <h2>Anbieter</h2>
        <p>
          <strong>[VOLLSTÄNDIGER RECHTLICHER UNTERNEHMENSNAME]</strong>
          <br />
          [RECHTSFORM, falls zutreffend]
          <br />
          [STRASSE UND HAUSNUMMER]
          <br />
          [PLZ UND ORT]
          <br />
          [LAND]
        </p>
      </section>

      <section className="legal-section">
        <h2>Vertretungsberechtigte Person</h2>
        <p>[VOR- UND NACHNAME, falls für die Rechtsform erforderlich]</p>
      </section>

      <section className="legal-section">
        <h2>Kontakt</h2>
        <p>
          E-Mail: <strong>[ÖFFENTLICHE KONTAKT-E-MAIL]</strong>
          <br />
          Telefon: <strong>[TELEFONNUMMER, falls angeboten]</strong>
        </p>
      </section>

      <section className="legal-section">
        <h2>Unternehmensangaben</h2>
        <p>
          Handelsregister / UID: <strong>[ANGABE ODER «NICHT ZUTREFFEND»]</strong>
          <br />
          Mehrwertsteuernummer:{" "}
          <strong>[ANGABE ODER «NICHT MWST-PFLICHTIG»]</strong>
        </p>
      </section>

      <section className="legal-section">
        <h2>Verantwortlich für den Inhalt</h2>
        <p>
          <strong>[NAME UND POSTANSCHRIFT DER VERANTWORTLICHEN PERSON]</strong>
        </p>
      </section>
    </LegalDocument>
  );
}

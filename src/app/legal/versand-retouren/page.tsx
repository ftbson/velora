import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Versand, Zahlung und Rückgabe",
  description: "Informationen zu Versandkosten, Zahlung und Rückgaben bei VELORA.",
};

export default function ShippingReturnsPage() {
  return (
    <LegalDocument
      title="Versand, Zahlung und Rückgabe"
      description="Der Versand in die angebotenen Liefergebiete ist kostenlos. Hier finden Sie Informationen zu Zahlung und Rückgabe."
    >
      <section className="legal-section">
        <h2>Liefergebiet</h2>
        <p>
          Im aktuellen Checkout können Lieferadressen in der Schweiz und in
          Liechtenstein ausgewählt werden. Bitte prüfen Sie die verfügbaren
          Länder im Checkout, bevor Sie eine Bestellung absenden. Weitere
          Länder werden nur beliefert, wenn sie dort ausdrücklich angeboten
          werden.
        </p>
      </section>

      <section className="legal-section">
        <h2>Versandkosten</h2>
        <p>
          Der Versand ist für alle Bestellungen kostenlos. Im Checkout werden
          keine zusätzlichen Versandkosten berechnet.
        </p>
      </section>

      <section className="legal-section">
        <h2>Lieferzeit und Versanddienstleister</h2>
        <p>
          Die verbindlichen Lieferzeiten, der Versanddienstleister, die
          Bearbeitungszeit und das Vorgehen bei Lieferverzögerungen müssen
          durch den Anbieter ergänzt werden:{" "}
          <strong>[LIEFERZEIT, VERSANDPARTNER UND VERZÖGERUNGEN ERGÄNZEN]</strong>.
        </p>
      </section>

      <section className="legal-section">
        <h2>Zahlung per Überweisung</h2>
        <p>
          Der aktuelle Checkout bietet Banküberweisung an. Nach dem Absenden
          der Bestellung werden Bestellnummer, Gesamtbetrag und die hinterlegten
          Bankdaten angezeigt. Zahlungsfrist und Verwendungszweck:{" "}
          <strong>[ZAHLUNGSFRIST UND VERWENDUNGSZWECK ERGÄNZEN]</strong>.
        </p>
        <p>
          Bitte zahlen Sie ausschliesslich auf die im Checkout angezeigte
          Bankverbindung und verwenden Sie die angegebene Bestellnummer als
          Referenz, sofern dort nichts anderes angegeben ist.
        </p>
      </section>

      <section className="legal-section">
        <h2>Rückgabe und Erstattung</h2>
        <p>
          Rückgabefrist, Zustand der Ware, Ausnahmen, Rücksendekosten,
          Rücksendeadresse und Dauer der Erstattung sind vom Anbieter
          festzulegen und rechtlich zu prüfen:{" "}
          <strong>[VOLLSTÄNDIGE RÜCKGABEREGELN ERGÄNZEN]</strong>.
        </p>
        <p>
          Bitte stimmen Sie eine Rücksendung vorab über{" "}
          <a href={`mailto:${SITE_CONFIG.email}`}><strong>{SITE_CONFIG.email}</strong></a> oder telefonisch unter{" "}
          <a href={`tel:${SITE_CONFIG.phoneRaw}`}><strong>{SITE_CONFIG.phone}</strong></a> ab.
        </p>
      </section>

      <section className="legal-section">
        <h2>Garantie und Beanstandungen</h2>
        <p>
          Garantieumfang, Dauer, Ausschlüsse und die Abwicklung von
          Beanstandungen müssen je nach Produkt und geltenden Bedingungen
          ergänzt werden: <strong>[GARANTIEBEDINGUNGEN ERGÄNZEN]</strong>.
        </p>
      </section>
    </LegalDocument>
  );
}

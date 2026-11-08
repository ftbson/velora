import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Versand, Zahlung und Rückgabe",
  description: "Informationen zu Versandkosten, Zahlung und Rückgaben bei VELORA.",
};

export default function ShippingReturnsPage() {
  return (
    <LegalDocument
      title="Versand, Zahlung und Rückgabe"
      description="Die Angaben zu Versandkosten und Zahlung entsprechen dem aktuellen Checkout. Nicht bestätigte Bedingungen sind gekennzeichnet."
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
          Gemäss aktuellem Checkout betragen die Versandkosten CHF 15.00 bei
          einem Warenwert bis einschliesslich CHF 150.00. Bei einem Warenwert
          über CHF 150.00 ist der Versand kostenlos. Der im Checkout
          ausgewiesene Betrag ist vor dem Absenden der Bestellung massgeblich.
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
          <strong>[KUNDENSERVICE-E-MAIL]</strong> ab. Dieser Hinweis ersetzt
          nicht die noch zu ergänzenden verbindlichen Rückgabebedingungen.
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

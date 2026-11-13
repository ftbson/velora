import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { companyConfig } from "@/config/company";

export const metadata: Metadata = {
  title: "Versand, Zahlung und Rückgabe",
  description: "Informationen zu Versandkosten, Lieferzeiten, Zahlungsarten und Rückgaberecht bei VELORA. Kostenlose Lieferung in die Schweiz und nach Liechtenstein.",
};

export default function ShippingReturnsPage() {
  const c = companyConfig;

  return (
    <LegalDocument
      title="Versand, Zahlung und Rückgabe"
      description="Kostenlose Lieferung in die Schweiz und nach Liechtenstein. Hier finden Sie alle Informationen zu Versand, Zahlung und Rückgabe."
    >
      <section className="legal-section">
        <h2>Liefergebiet</h2>
        <p>
          VELORA liefert ausschliesslich an Adressen in der <strong>Schweiz</strong> und in <strong>Liechtenstein</strong>.
          Andere Länder werden derzeit nicht beliefert. Bitte prüfen Sie im Checkout, ob Ihre Lieferadresse in einem der angebotenen Länder liegt.
        </p>
      </section>

      <section className="legal-section">
        <h2>Versandkosten</h2>
        <p>
          Der Versand ist für <strong>alle Bestellungen kostenlos</strong>. Im Checkout werden keine zusätzlichen Versandkosten berechnet.
        </p>
      </section>

      <section className="legal-section">
        <h2>Lieferzeit und Versanddienstleister</h2>
        <p>
          <strong>Lieferzeit:</strong> {c.deliveryTimeText || "2 bis 4 Werktage"} nach Zahlungseingang (bzw. nach Bestellbestätigung bei Vorkasse).
        </p>
        <p>
          <strong>Versanddienstleister:</strong> {c.shippingCarrier || "[Versandpartner – À REMPLIR dans company.ts]"}.
        </p>
        <p>
          Die Lieferung erfolgt an die im Checkout angegebene Adresse. Bei Lieferverzögerungen informieren wir Sie proaktiv per E-Mail.
          Sollte ein Produkt nicht lieferbar sein, werden Sie unverzüglich benachrichtigt und bereits geleistete Zahlungen zurückerstattet.
        </p>
      </section>

      <section className="legal-section">
        <h2>Zahlungsarten</h2>
        <ul>
          {c.paymentProviders.map((provider, idx) => (
            <li key={idx}>{provider}</li>
          ))}
        </ul>
        {c.paymentProviders.includes("Banküberweisung") && (
          <p>
            <strong>Bei Banküberweisung:</strong> Nach Abschluss der Bestellung erhalten Sie die Bankverbindung und den Verwendungszweck
            (Ihre Bestellnummer). Bitte überweisen Sie den Gesamtbetrag innerhalb von <strong>{c.paymentDeadlineDays} Tagen</strong>.
            Die Bestellung wird erst nach Zahlungseingang bearbeitet und versandt.
          </p>
        )}
      </section>

      <section className="legal-section">
        <h2>Widerrufsrecht und Rückgabe</h2>
        <p>
          Sie haben das Recht, binnen <strong>{c.returnPeriodDays} Tagen</strong> ohne Angabe von Gründen diesen Vertrag zu widerrufen.
          Die Widerrufsfrist beträgt {c.returnPeriodDays} Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter
          (der nicht der Beförderer ist) die Waren in Besitz genommen haben.
        </p>
        <p>
          <strong>Voraussetzungen für die Rückgabe:</strong>
        </p>
        <ul>
          <li>Die Ware muss unbenutzt, unbeschädigt und in der Originalverpackung sein.</li>
          <li>Alle Zubehörteile, Handbücher und Etiketten müssen vollständig vorliegen.</li>
          <li>Bei Fahrrädern/E-Bikes: Keine Montagespuren, keine Fahrspuren, originales Schutzmaterial intakt.</li>
        </ul>
        <p>
          <strong>Rücksendekosten:</strong> {c.returnShippingCostPolicy || "[Rücksendekosten-Regelung – À REMPLIR]"}.
        </p>
        <p>
          <strong>Rücksendeadresse:</strong> Bitte stimmen Sie jede Rücksendung vorab per E-Mail
          (<a href={`mailto:${c.email}`}>{c.email}</a>) oder telefonisch
          (<a href={`tel:${c.phoneRaw}`}>{c.phone}</a>) mit uns ab. Sie erhalten dann die genaue Rücksendeadresse und Anweisungen.
        </p>
        <p>
          <strong>Rückerstattung:</strong> Wir erstatten Ihnen alle erhaltenen Zahlungen, einschliesslich der Lieferkosten
          (ausser zusätzliche Kosten durch eine von Ihnen gewählte andere Art der Lieferung als die günstigste Standardlieferung),
          unverzüglich und spätestens binnen <strong>{c.returnRefundDurationDays} Tagen</strong> ab dem Tag, an dem die Mitteilung
          über Ihren Widerruf bei uns eingegangen ist. Die Rückerstattung erfolgt über dasselbe Zahlungsmittel, das Sie bei der
          ursprünglichen Transaktion eingesetzt haben, sofern nicht ausdrücklich etwas anderes vereinbart wurde.
        </p>
      </section>

      <section className="legal-section">
        <h2>Ausschluss des Widerrufsrechts</h2>
        <p>
          Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die nach Kundenspezifikationen angefertigt
          wurden oder eindeutig auf die persönlichen Bedürfnisse zugeschnitten sind (z. B. massgefertigte Fahrräder, personalisierte
          Bekleidung), sowie bei versiegelten Waren, die aus Gründen des Gesundheitsschutzes oder der Hygiene nicht zur Rückgabe
          geeignet sind, wenn ihre Versiegelung nach der Lieferung entfernt wurde.
        </p>
      </section>

      <section className="legal-section">
        <h2>Garantie und Gewährleistung</h2>
        <p>
          {c.warrantyText || "[Garantiebedingungen – À REMPLIR]"}
        </p>
        <p>
          Gesetzliche Gewährleistungsrechte (Mängelhaftung) bleiben unberührt. Bei Mängeln wenden Sie sich bitte an
          <a href={`mailto:${c.email}`}>{c.email}</a> mit Beschreibung und Fotos des Mangels.
        </p>
      </section>

      <section className="legal-section">
        <h2>Beanstandungen und Transportschäden</h2>
        <p>
          Bitte prüfen Sie die Lieferung sofort auf Vollständigkeit und offensichtliche Transportschäden.
          Zeigen Sie offensichtliche Mängel oder Transportschäden innerhalb von <strong>2 Werktagen</strong> nach Erhalt
          bei uns an (<a href={`mailto:${c.email}`}>{c.email}</a>). Dies erleichtert die Abwicklung mit dem Versanddienstleister.
          Ihre gesetzlichen Gewährleistungsrechte werden durch diese Frist nicht eingeschränkt.
        </p>
      </section>
    </LegalDocument>
  );
}
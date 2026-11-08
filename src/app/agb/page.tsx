import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen (AGB)",
  description: "Allgemeine Geschäftsbedingungen von Swiss Holz für den Verkauf von Brennholz, Buchenholz und Holzpellets.",
};

export default function AGBPage() {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <h1 className="legal-title">Allgemeine Geschäftsbedingungen (AGB)</h1>
          <p className="legal-subtitle">Gültig ab: Januar 2026 | Swiss Holz</p>
        </header>

        <article className="legal-content">
          <section className="legal-section">
            <h2>1. Geltungsbereich</h2>
            <p>
              Für alle Bestellungen über unseren Online-Shop gelten die nachfolgenden Allgemeinen Geschäftsbedingungen (AGB). Das Angebot richtet sich an Kunden in der Schweiz und im Fürstentum Liechtenstein.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Vertragspartner & Kundendienst</h2>
            <p>
              Der Kaufvertrag kommt zustande mit <strong>Swiss Holz</strong>. Weitere Informationen zu uns finden Sie im Impressum. Bei Fragen, Reklamationen oder Beanstandungen erreichen Sie unseren Kundendienst per E-Mail oder WhatsApp.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Angebot und Vertragsschluss</h2>
            <p>
              Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern einen unverbindlichen Online-Katalog dar. Durch Anklicken des Buttons zur Bestellaufgabe geben Sie eine verbindliche Bestellung der im Warenkorb enthaltenen Waren ab.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Preise und Versandkosten</h2>
            <p>
              Die auf den Produktseiten genannten Preise sind in Schweizer Franken (CHF) angegeben und enthalten die gesetzliche Mehrwertsteuer. 
            </p>
            <ul>
              <li>Für Bestellungen unter <strong>CHF 150.00</strong> fällt eine Versandkostenpauschale von <strong>CHF 15.00</strong> an.</li>
              <li>Bestellungen ab einem Warenwert von <strong>CHF 150.00</strong> sind versandkostenfrei.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Zahlungsbedingungen</h2>
            <p>
              Die Zahlung erfolgt per Vorkasse (Banküberweisung). Nach der Bestellung erhalten Sie unsere Bankverbindung sowie die Anweisungen zur Überweisung. Die Ware wird nach Zahlungseingang für den Versand vorbereitet.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Lieferung und Transport</h2>
            <p>
              Die Lieferung erfolgt an die vom Kunden angegebene Lieferadresse. Bei Palettenware (Brennholz, Pellets) erfolgt die Lieferung frei Bordsteinkante, sofern der Zugang für LKW gewährleistet ist.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Eigentumsvorbehalt</h2>
            <p>
              Die Ware bleibt bis zur vollständigen Bezahlung Eigentum von Swiss Holz.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Gewährleistung und Haftung</h2>
            <p>
              Es gelten die gesetzlichen Gewährleistungsbestimmungen. Holz ist ein Naturprodukt; geringfügige Abweichungen in Farbe, Struktur oder Feuchtigkeitsgehalt stellen keinen Mangel dar.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Anwendbares Recht & Gerichtsstand</h2>
            <p>
              Es gilt ausschliesslich Schweizer Recht. Gerichtsstand ist der Sitz des Anbieters, soweit nicht gesetzlich zwingend ein anderer Gerichtsstand vorgeschrieben ist.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
import { SITE_CONFIG } from "@/config/site";

export default function TermsContent() {
  return (
    <>
      <section className="legal-section">
        <h2>1. Anbieter und Geltungsbereich</h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für Bestellungen
          im Online-Shop VELORA. Vertragspartner ist{" "}
          <strong>[VOLLSTÄNDIGER RECHTLICHER UNTERNEHMENSNAME]</strong>,
          [RECHTSFORM], [VOLLSTÄNDIGE POSTANSCHRIFT]. Bitte vervollständigen und
          prüfen Sie diese Angaben vor der Veröffentlichung.
        </p>
        <p>
          Der Shop zeigt derzeit die Schweiz und Liechtenstein als Lieferländer
          an. Das tatsächliche Liefergebiet und allfällige Abweichungen sind vor
          Bestellung im Checkout ersichtlich.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Produkte und Verfügbarkeit</h2>
        <p>
          Die Produktdarstellungen im Shop dienen der Information. Massgeblich
          sind die Produktangaben, der Preis und die Lieferinformationen, die
          zum Zeitpunkt der Bestellung angezeigt werden. Abbildungen können
          vom gelieferten Produkt abweichen. Die Verfügbarkeit wird im Shop
          angezeigt oder nach der Bestellung bestätigt.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Preise und Versandkosten</h2>
        <p>
          Die Preise werden im Shop in Schweizer Franken (CHF) angezeigt. Die
          Behandlung der Mehrwertsteuer und allfälliger Abgaben muss der
          Anbieter vor Veröffentlichung ergänzen:{" "}
          <strong>[MWST-/ABGABENHINWEIS ERGÄNZEN]</strong>.
        </p>
        <p>
          Der Versand ist für alle Bestellungen kostenlos. Es werden keine
          zusätzlichen Versandkosten berechnet.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Bestellung und Vertragsschluss</h2>
        <p>
          Nach dem Absenden einer Bestellung werden die Bestelldaten
          gespeichert und die Zahlungsinformationen für eine Banküberweisung
          angezeigt. Die Bestellung erhält zunächst den Status «pending».
          Wann der Kaufvertrag verbindlich zustande kommt und wie eine
          Bestätigung erfolgt, muss der Anbieter eindeutig festlegen:{" "}
          <strong>[VERTRAGSSCHLUSS UND BESTÄTIGUNG DEFINIEREN]</strong>.
        </p>
        <p>
          Bitte prüfen Sie Ihre Angaben vor dem Absenden. Bei einem Fehler
          kontaktieren Sie den Kundenservice unter{" "}
          <a href={`mailto:${SITE_CONFIG.email}`}><strong>{SITE_CONFIG.email}</strong></a> oder telefonisch unter{" "}
          <a href={`tel:${SITE_CONFIG.phoneRaw}`}><strong>{SITE_CONFIG.phone}</strong></a>.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Zahlung</h2>
        <p>
          Der aktuelle Checkout sieht die Zahlung per Banküberweisung vor. Die
          individuellen Bankdaten und der zu überweisende Betrag werden nach
          dem Absenden der Bestellung angezeigt. Zahlungsfrist, Folgen einer
          ausbleibenden Zahlung und allfällige weitere Zahlungsmittel:{" "}
          <strong>[ZAHLUNGSBEDINGUNGEN ERGÄNZEN]</strong>.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Lieferung</h2>
        <p>
          Die Lieferung erfolgt an die im Checkout angegebene Adresse in einem
          dort angebotenen Lieferland. Verbindliche Lieferzeiten, Versandpartner,
          Einschränkungen und das Vorgehen bei verspäteter oder fehlgeschlagener
          Zustellung: <strong>[LIEFERBEDINGUNGEN ERGÄNZEN]</strong>.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Stornierung, Rückgabe und Mängel</h2>
        <p>
          Rückgabefrist, Voraussetzungen, Rücksendekosten, Erstattungsablauf
          und allfällige Ausschlüsse müssen vom Anbieter festgelegt werden:{" "}
          <strong>[RÜCKGABE- UND ERSTATTUNGSREGELN ERGÄNZEN]</strong>.
        </p>
        <p>
          Bitte beschreiben Sie ebenfalls die geltenden Garantie- und
          Gewährleistungsbedingungen sowie den Ablauf einer Mängelmeldung:{" "}
          <strong>[GARANTIE- UND MÄNGELREGELN ERGÄNZEN]</strong>.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Datenschutz</h2>
        <p>
          Informationen zur Bearbeitung personenbezogener Daten finden Sie in
          unserer <a href="/legal/privacy">Datenschutzerklärung</a>.
        </p>
      </section>

      <section className="legal-section">
        <h2>9. Anwendbares Recht und Streitigkeiten</h2>
        <p>
          Anwendbares Recht, Gerichtsstand und allfällige zwingende
          Verbraucherschutzbestimmungen müssen für den tatsächlichen Sitz des
          Anbieters und die belieferten Länder geprüft und ergänzt werden:{" "}
          <strong>[RECHT UND GERICHTSSTAND PRÜFEN]</strong>.
        </p>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Informationen zur Verarbeitung personenbezogener Daten bei VELORA.",
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Datenschutzerklärung"
      description="Welche Daten VELORA verarbeitet, wofür sie verwendet werden und welche Rechte Sie haben."
    >
      <section className="legal-section">
        <h2>1. Verantwortliche Stelle</h2>
        <p>
          Verantwortlich für die Bearbeitung personenbezogener Daten ist{" "}
          <strong>[RECHTLICHER UNTERNEHMENSNAME]</strong>, [POSTANSCHRIFT].
          Datenschutzanfragen: <strong>[DATENSCHUTZ-/KONTAKT-E-MAIL]</strong>.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Welche Daten wir bearbeiten</h2>
        <ul>
          <li>
            Konto: Name, E-Mail-Adresse, verschlüsselter Passwort-Hash und
            technische Sitzungsdaten.
          </li>
          <li>
            Bestellung: Name, E-Mail-Adresse, Telefonnummer, Lieferland,
            Lieferadresse, bestellte Produkte, Beträge und Bestellstatus.
          </li>
          <li>
            Kontaktanfrage: Name, E-Mail-Adresse, optional Telefonnummer und
            Betreff sowie der Inhalt Ihrer Nachricht.
          </li>
          <li>
            Warenkorb und Merkliste: Produktkennungen und Mengen, die im
            lokalen Speicher Ihres Browsers abgelegt werden.
          </li>
          <li>
            Technische Daten, die beim Aufruf der Website durch Hosting- und
            Sicherheitsdienste anfallen können, beispielsweise Zeitpunkt,
            angefragte Seite und technische Verbindungsdaten.
          </li>
        </ul>
        <p>
          Bitte übermitteln Sie keine besonders vertraulichen Informationen
          über das Kontaktformular.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Zwecke der Bearbeitung</h2>
        <p>
          Wir verwenden Daten, um Kundenkonten bereitzustellen, Bestellungen
          entgegenzunehmen und abzuwickeln, Kundenanfragen zu beantworten,
          Bestellbenachrichtigungen zu versenden, die Website zu schützen und
          gesetzliche Pflichten zu erfüllen. Für andere Zwecke, insbesondere
          Werbung oder Analyse, ist vor Veröffentlichung zu ergänzen, ob und
          welche Dienste tatsächlich eingesetzt werden:{" "}
          <strong>[WEITERE ZWECKE UND DIENSTE PRÜFEN]</strong>.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Empfänger und Dienstleister</h2>
        <p>
          Bestell-, Konto- und weitere Website-Daten werden für den Betrieb
          derzeit in einer Turso-Datenbank verarbeitet. Die Website wird über
          Vercel bereitgestellt. Nachrichten und Bestellbenachrichtigungen
          werden über den konfigurierten SMTP-E-Mail-Dienst versendet; dessen
          Anbieter ist <strong>[SMTP-ANBIETER UND SITZ ERGÄNZEN]</strong>.
        </p>
        <p>
          Bitte ergänzen Sie alle weiteren Dienstleister, die Daten erhalten,
          sowie die jeweiligen Länder und allfällige Garantien für
          internationale Übermittlungen:{" "}
          <strong>[WEITERE EMPFÄNGER UND DATENÜBERMITTLUNGEN PRÜFEN]</strong>.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Zahlungen</h2>
        <p>
          Der aktuelle Checkout zeigt Zahlungsangaben für eine
          Banküberweisung an und nimmt keine Kartendaten entgegen. Die
          Überweisung wird ausserhalb der Website abgewickelt. Die für die
          Zahlung nötigen Bank- und Buchhaltungsdaten können vom beteiligten
          Finanzinstitut und vom Anbieter bearbeitet werden.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Aufbewahrungsdauer</h2>
        <p>
          Wir bewahren Daten nur so lange auf, wie dies für die genannten
          Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten
          bestehen. Die konkreten Fristen für Bestell-, Buchhaltungs-, Konto-
          und Kontaktformulardaten sind vom Anbieter festzulegen:{" "}
          <strong>[AUFBEWAHRUNGSFRISTEN ERGÄNZEN]</strong>.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Cookies und lokaler Speicher</h2>
        <p>
          Für angemeldete Kunden wird ein technisch notwendiges,
          HTTP-only-Sitzungscookie verwendet. Warenkorb und Merkliste werden
          im lokalen Speicher des Browsers gehalten. Weitere Informationen
          finden Sie unter <a href="/legal/cookies">Cookies</a>.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Ihre Rechte und Kontakt</h2>
        <p>
          Je nach anwendbarem Datenschutzrecht können Sie Auskunft, Berichtigung
          oder Löschung verlangen und einer Bearbeitung widersprechen oder
          Einschränkungen beantragen. Schreiben Sie dazu an{" "}
          <strong>[DATENSCHUTZ-/KONTAKT-E-MAIL]</strong>. Sie können sich
          ausserdem an die zuständige Datenschutzaufsichtsbehörde wenden.
          Zuständige Behörde und Kontaktangaben sind anhand des tatsächlichen
          Unternehmenssitzes zu ergänzen:{" "}
          <strong>[AUFSICHTSBEHÖRDE PRÜFEN]</strong>.
        </p>
      </section>

      <section className="legal-section">
        <h2>9. Aktualisierungen</h2>
        <p>
          Wir können diese Datenschutzerklärung anpassen, wenn sich unsere
          Datenbearbeitung oder die anwendbaren Anforderungen ändern. Es gilt
          die auf dieser Seite veröffentlichte Fassung.
        </p>
      </section>
    </LegalDocument>
  );
}

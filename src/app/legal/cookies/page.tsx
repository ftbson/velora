import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import CookieSettingsButton from "@/components/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Cookies und lokaler Speicher",
  description: "Informationen zu Cookies und lokal gespeicherten Daten bei VELORA.",
};

export default function CookiesPage() {
  return (
    <LegalDocument
      title="Cookies und lokaler Speicher"
      description="Welche technisch notwendigen Speichertechnologien der Shop verwendet."
    >
      <section className="legal-section">
        <h2>Technisch notwendige Sitzungscookies</h2>
        <p>
          Wenn Sie sich anmelden, setzt VELORA ein Sitzungscookie, damit Ihr
          Kundenkonto während der Nutzung verfügbar bleibt. Es ist
          HTTP-only, im Produktionsbetrieb als Secure markiert und auf
          SameSite Strict gesetzt. Die Kunden- und Admin-Sitzung läuft nach
          spätestens 30 Tagen ab. Das Cookie dient der Anmeldung und wird
          nicht für Werbeprofile verwendet.
        </p>
      </section>

      <section className="legal-section">
        <h2>Warenkorb und Merkliste</h2>
        <p>
          Warenkorb und Favoriten werden im lokalen Speicher Ihres Browsers
          gespeichert, damit sie bei einem späteren Besuch auf demselben
          Browser erhalten bleiben. Diese Einträge sind keine Cookies und
          werden nicht mit einem Kundenkonto synchronisiert. Sie können den
          lokalen Speicher über die Einstellungen Ihres Browsers löschen.
        </p>
      </section>

      <section className="legal-section">
        <h2>Analyse und Marketing</h2>
        <p>
          Im derzeit geprüften Anwendungscode ist kein Analyse- oder
          Marketing-Pixel eingebunden. Vor Veröffentlichung ist zu prüfen, ob
          solche Dienste über die Deployment-Konfiguration, Tag-Manager oder
          zusätzliche Skripte aktiviert sind. Falls ja, müssen Anbieter,
          Zwecke und Einwilligungsoptionen hier ergänzt werden.
        </p>
      </section>

      <section className="legal-section">
        <h2>Speicher verwalten</h2>
        <p>
          Sie können Cookies und lokalen Speicher in den Einstellungen Ihres
          Browsers anzeigen und löschen. Wenn Sie notwendige Sitzungscookies
          blockieren, können Anmeldung und Konto-Funktionen eingeschränkt sein.
          Weitere Informationen zur Bearbeitung Ihrer Daten enthält die{" "}
          <a href="/legal/privacy">Datenschutzerklärung</a>.
        </p>
        <div style={{ marginTop: "16px" }}>
          <CookieSettingsButton />
        </div>
      </section>
    </LegalDocument>
  );
}

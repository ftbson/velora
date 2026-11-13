import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { companyConfig } from "@/config/company";

export const metadata: Metadata = {
  title: "Cookie-Richtlinie",
  description: "Informationen zu Cookies, localStorage und Einwilligungsmanagement bei VELORA – technisch notwendige Cookies, funktionale Präferenzen, Analyse-Cookies, Consent Mode v2.",
};

export default function CookiesPage() {
  const c = companyConfig;

  return (
    <LegalDocument
      title="Cookie-Richtlinie"
      description="Welche Cookies und Speichertechnologien VELORA einsetzt, zu welchem Zweck und wie Sie Ihre Einwilligung verwalten können."
    >
      <section className="legal-section">
        <h2>1. Was sind Cookies und lokale Speicher?</h2>
        <p>
          <strong>Cookies</strong> sind kleine Textdateien, die beim Besuch einer Website auf Ihrem Endgerät gespeichert werden.
          Sie ermöglichen es der Website, sich Ihre Aktionen und Präferenzen (z. B. Login, Sprache, Warenkorb) über einen
          bestimmten Zeitraum zu merken.
        </p>
        <p>
          <strong>localStorage / sessionStorage</strong> sind browserbasierte Speicher, die grössere Datenmengen clientseitig
          ablegen können (z. B. Warenkorb-Inhalte, Merkliste), ohne bei jedem Request an den Server gesendet zu werden.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Übersicht der bei VELORA eingesetzten Technologien</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1rem", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ background: "#f3f4f6" }}>
              <th style={{ padding: "8px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>Name / Key</th>
              <th style={{ padding: "8px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>Typ</th>
              <th style={{ padding: "8px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>Zweck</th>
              <th style={{ padding: "8px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>Laufzeit</th>
              <th style={{ padding: "8px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>Einwilligung</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px", fontFamily: "monospace" }}>velora_customer_session</td>
              <td style={{ padding: "8px" }}>Cookie (HTTP-only, Secure, SameSite=Strict)</td>
              <td style={{ padding: "8px" }}>Kunden-Login-Session, Authentifizierung</td>
              <td style={{ padding: "8px" }}>30 Tage</td>
              <td style={{ padding: "8px" }}>Nicht erforderlich (technisch notwendig)</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px", fontFamily: "monospace" }}>velora_admin_session</td>
              <td style={{ padding: "8px" }}>Cookie (HTTP-only, Secure, SameSite=Strict)</td>
              <td style={{ padding: "8px" }}>Admin-Login-Session</td>
              <td style={{ padding: "8px" }}>30 Tage</td>
              <td style={{ padding: "8px" }}>Nicht erforderlich (technisch notwendig)</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px", fontFamily: "monospace" }}>swissholz_cart (legacy)</td>
              <td style={{ padding: "8px" }}>localStorage</td>
              <td style={{ padding: "8px" }}>Warenkorb-Daten (Produkt-IDs, Mengen)</td>
              <td style={{ padding: "8px" }}>Bis manuelle Löschung</td>
              <td style={{ padding: "8px" }}>Nicht erforderlich (technisch notwendig)</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px", fontFamily: "monospace" }}>velora_favorites</td>
              <td style={{ padding: "8px" }}>localStorage</td>
              <td style={{ padding: "8px" }}>Merkliste / Wunschliste (Produkt-IDs)</td>
              <td style={{ padding: "8px" }}>Bis manuelle Löschung</td>
              <td style={{ padding: "8px" }}>Nicht erforderlich (technisch notwendig)</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px", fontFamily: "monospace" }}>velora_cookie_consent</td>
              <td style={{ padding: "8px" }}>localStorage</td>
              <td style={{ padding: "8px" }}>Speichert die Cookie-Einwilligungsentscheidung</td>
              <td style={{ padding: "8px" }}>1 Jahr (danach erneute Abfrage)</td>
              <td style={{ padding: "8px" }}>Nicht erforderlich (Speicherung der Entscheidung)</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px", fontFamily: "monospace" }}>_ga, _ga_*, _gid</td>
              <td style={{ padding: "8px" }}>Cookies (Google Analytics)</td>
              <td style={{ padding: "8px" }}>Nutzungsanalyse, Statistiken, Conversion-Tracking</td>
              <td style={{ padding: "8px" }}>2 Jahre / 24h</td>
              <td style={{ padding: "8px"}}><strong>Erforderlich</strong> (Kategorie: Statistik)</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px", fontFamily: "monospace" }}>_fbp, _fbc</td>
              <td style={{ padding: "8px" }}>Cookies (Meta Pixel)</td>
              <td style={{ padding: "8px" }}>Conversion-Tracking, Remarketing (Facebook/Instagram)</td>
              <td style={{ padding: "8px" }}>90 Tage</td>
              <td style={{ padding: "8px"}}><strong>Erforderlich</strong> (Kategorie: Marketing)</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px", fontFamily: "monospace" }}>stripe_*</td>
              <td style={{ padding: "8px" }}>Cookies (Stripe)</td>
              <td style={{ padding: "8px" }}>Betrugsprävention, Zahlungsabwicklung</td>
              <td style={{ padding: "8px" }}>Variabel</td>
              <td style={{ padding: "8px" }}>Nicht erforderlich (technisch notwendig für Zahlung)</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>Hinweis:</strong> Google Analytics / Meta Pixel / Stripe Cookies werden <strong>nur gesetzt, nachdem Sie
          im Cookie-Banner der Kategorie „Statistik“ bzw. „Marketing“ zugestimmt haben</strong> (Consent Mode v2).
          Ohne Einwilligung werden keine Analyse- oder Marketing-Cookies gesetzt.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Kategorien und Einwilligung (Consent Management)</h2>
        <p>Der Cookie-Banner beim ersten Besuch unterscheidet folgende Kategorien:</p>
        <ul>
          <li><strong>Technisch notwendig (immer aktiv):</strong> Sitzungscookies für Login, Warenkorb-Session, CSRF-Schutz,
            Speicherung der Einwilligung (localStorage). Ohne diese funktioniert der Shop nicht.</li>
          <li><strong>Funktionale Präferenzen (optional):</strong> Speicherung von Filtereinstellungen, Merkliste,
            Spracheinstellungen – über localStorage, keine Cookies.</li>
          <li><strong>Statistik & Optimierung (optional, Einwilligung erforderlich):</strong> Google Analytics (GA4)
            zur anonymisierten Nutzungsanalyse. IP-Anonymisierung aktiv. Consent Mode v2: <code>analytics_storage='granted'</code>.</li>
          <li><strong>Marketing (optional, Einwilligung erforderlich):</strong> Meta Pixel (Facebook/Instagram) für
            Conversion-Tracking und Remarketing. Consent Mode v2: <code>ad_storage='granted'</code>, <code>ad_user_data='granted'</code>.</li>
        </ul>
        <p>
          Sie können Ihre Einwilligung jederzeit ändern oder widerrufen:
          <CookieSettingsButton />
          oder über den Link „Cookie-Einstellungen“ im Footer.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Google Consent Mode v2</h2>
        <p>
          VELORA nutzt <strong>Google Consent Mode v2</strong>, um die Auslieferung von Google-Tags (Google Analytics,
          Google Ads Conversion Tracking) an die Einwilligung des Nutzers anzupassen.
        </p>
        <ul>
          <li><code>analytics_storage</code>: „granted“ bei Einwilligung in Statistik-Cookies, sonst „denied“.</li>
          <li><code>ad_storage</code>: „granted“ bei Einwilligung in Marketing-Cookies, sonst „denied“.</li>
          <li><code>ad_user_data</code>: „granted“ bei Einwilligung in Marketing-Cookies, sonst „denied“.</li>
          <li><code>ad_personalization</code>: „granted“ bei Einwilligung in Marketing-Cookies, sonst „denied“.</li>
        </ul>
        <p>
          Ohne Einwilligung werden keine personenbezogenen Daten an Google übermittelt; es werden lediglich
          modellierte, aggregierte Daten (Conversion Modeling) verwendet, sofern vom Nutzer nicht aktiv blockiert.
        </p>
        <p>
          Die Consent Mode v2 Integration wird aktiviert, sobald eine Google Tag Manager Container-ID oder
          Google Analytics Measurement ID in den Umgebungsvariablen konfiguriert ist (<code>NEXT_PUBLIC_GA_ID</code>,
          <code>NEXT_PUBLIC_GTM_ID</code>).
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Verwaltung und Löschung von Cookies / localStorage</h2>
        <p>Sie können Cookies und lokalen Speicher in den Einstellungen Ihres Browsers verwalten:</p>
        <ul>
          <li><strong>Chrome:</strong> Einstellungen → Datenschutz und Sicherheit → Cookies und andere Websitedaten</li>
          <li><strong>Firefox:</strong> Einstellungen → Datenschutz & Sicherheit → Cookies und Websitedaten</li>
          <li><strong>Safari:</strong> Einstellungen → Datenschutz → Websitedaten verwalten</li>
          <li><strong>Edge:</strong> Einstellungen → Cookies und Websiteberechtigungen → Cookies und Websitedaten</li>
        </ul>
        <p>
          <strong>Hinweis:</strong> Wenn Sie technisch notwendige Sitzungscookies blockieren, können Anmeldung,
          Warenkorb und Checkout-Funktionen eingeschränkt oder nicht nutzbar sein.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Kontakt bei Fragen zu Cookies</h2>
        <p>
          Bei Fragen zu dieser Cookie-Richtlinie oder zur Verarbeitung Ihrer Daten wenden Sie sich an:
        </p>
        <p>
          <a href={`mailto:${c.privacyEmail}`}><strong>{c.privacyEmail}</strong></a>
          <br />
          {c.legalName ? c.legalName : "[Firmenname]"}<br />
          {c.street ? `${c.street}, ${c.postalCode} ${c.city}` : "[Adresse]"}
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Änderungen dieser Cookie-Richtlinie</h2>
        <p>
          Wir können diese Richtlinie anpassen, wenn sich die eingesetzten Technologien oder gesetzlichen Anforderungen ändern.
          Die jeweils aktuelle Fassung ist auf dieser Seite abrufbar.
        </p>
        <p><strong>Stand: November 2026</strong></p>
      </section>
    </LegalDocument>
  );
}
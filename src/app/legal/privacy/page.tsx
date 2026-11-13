import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { companyConfig, getFormattedAddress } from "@/config/company";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von VELORA gemäss nLPD/DSGVO – Verantwortlicher, verarbeitete Daten, Zwecke, Empfänger, Speicherdauer, Betroffenenrechte, Aufsichtsbehörde.",
};

export default function PrivacyPage() {
  const c = companyConfig;
  const address = getFormattedAddress();

  return (
    <LegalDocument
      title="Datenschutzerklärung"
      description="Informationen zur Bearbeitung personenbezogener Daten durch VELORA gemäss dem Schweizer Datenschutzgesetz (nLPD) und der DSGVO."
    >
      <section className="legal-section">
        <h2>1. Verantwortliche Stelle</h2>
        <p>
          Verantwortlich für die Bearbeitung personenbezogener Daten im Sinne des Schweizer Datenschutzgesetzes (nDSG)
          und der EU-Datenschutzgrundverordnung (DSGVO) ist:
        </p>
        <p>
          {c.legalName ? <strong>{c.legalName}</strong> : <em className="missing-field">[Raison sociale – À REMPLIR]</em>}
          <br />
          {address || <em className="missing-field">[Adresse – À REMPLIR]</em>}
          <br />
          E-Mail (Datenschutz): <a href={`mailto:${c.privacyEmail}`}><strong>{c.privacyEmail}</strong></a>
          <br />
          Telefon: <a href={`tel:${c.phoneRaw}`}>{c.phone}</a>
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Kategorien bearbeiteter Personendaten</h2>
        <p>Wir bearbeiten folgende Kategorien von Personendaten:</p>
        <ul>
          <li><strong>Konto-Daten:</strong> Name, E-Mail-Adresse, verschlüsselter Passwort-Hash, Sitzungsdaten (Login-Token).</li>
          <li><strong>Bestell-Daten:</strong> Name, E-Mail-Adresse, Telefonnummer (WhatsApp), Lieferland, Lieferadresse, bestellte Produkte, Beträge, Bestellstatus, Zahlungsart.</li>
          <li><strong>Kontaktanfragen:</strong> Name, E-Mail-Adresse, optional Telefonnummer, Betreff, Nachrichteninhalte.</li>
          <li><strong>Warenkorb & Merkliste:</strong> Produkt-IDs und Mengen, gespeichert im lokalen Speicher (localStorage) des Browsers – nicht mit dem Konto verknüpft.</li>
          <li><strong>Technische Daten:</strong> IP-Adresse (gekürzt), Browser-Typ/Version, Betriebssystem, Referrer-URL, aufgerufene Seiten, Uhrzeit des Zugriffs – erhoben durch Hosting- und Sicherheitsdienste (Vercel, Cloudflare).</li>
          <li><strong>Zahlungsdaten:</strong> Bei Banküberweisung: keine Kartendaten auf unserer Seite. Bei Karten/TWINT (nach Integration): Zahlungsdaten werden direkt vom Payment Provider (z. B. Stripe) verarbeitet; wir erhalten nur Bestätigung/Token.</li>
        </ul>
        <p>
          <strong>Keine besonderen Kategorien von Personendaten</strong> (Gesundheit, biometrisch, politisch, etc.) werden über den Shop erhoben.
          Bitte übermitteln Sie keine besonders vertraulichen Informationen über das Kontaktformular.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Zwecke der Bearbeitung und Rechtsgrundlagen</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1rem", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ background: "#f3f4f6" }}>
              <th style={{ padding: "8px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>Zweck</th>
              <th style={{ padding: "8px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>Datenkategorien</th>
              <th style={{ padding: "8px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>Rechtsgrundlage (nDSG / DSGVO)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px" }}>Kundenkonto bereitstellen & verwalten</td>
              <td style={{ padding: "8px" }}>Konto-Daten</td>
              <td style={{ padding: "8px" }}>Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO / Art. 31 nDSG)</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px" }}>Bestellungen entgegennehmen, abwickeln, liefern</td>
              <td style={{ padding: "8px" }}>Bestell-Daten</td>
              <td style={{ padding: "8px" }}>Vertragserfüllung, vorvertragliche Massnahmen</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px" }}>Kundenanfragen beantworten</td>
              <td style={{ padding: "8px" }}>Kontaktanfragen</td>
              <td style={{ padding: "8px" }}>Vertragserfüllung / berechtigtes Interesse</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px" }}>Bestell- & Statusbenachrichtigungen per E-Mail</td>
              <td style={{ padding: "8px" }}>Bestell-Daten, E-Mail</td>
              <td style={{ padding: "8px" }}>Vertragserfüllung / berechtigtes Interesse</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px" }}>Zahlungsabwicklung (Banküberweisung / Stripe)</td>
              <td style={{ padding: "8px" }}>Bestell-Daten, Zahlungsdaten</td>
              <td style={{ padding: "8px" }}>Vertragserfüllung</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px" }}>Website-Sicherheit, Missbrauchsprävention (Rate-Limiting, Bot-Schutz)</td>
              <td style={{ padding: "8px" }}>Technische Daten, IP</td>
              <td style={{ padding: "8px" }}>Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO)</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px" }}>Gesetzliche Aufbewahrungspflichten erfüllen (Buchhaltung, Steuer)</td>
              <td style={{ padding: "8px" }}>Bestell-Daten, Rechnungen</td>
              <td style={{ padding: "8px" }}>Rechtliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO / Art. 958a OR)</td>
            </tr>
            <tr>
              <td style={{ padding: "8px" }}>Analyse & Optimierung (nach Einwilligung)</td>
              <td style={{ padding: "8px" }}>Technische Daten, Nutzungsverhalten</td>
              <td style={{ padding: "8px" }}>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO / Art. 31 nDSG)</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>Keine automatisierte Entscheidungsfindung / Profiling</strong> im Sinne von Art. 22 DSGVO findet statt.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Empfänger und Kategorien von Empfängern</h2>
        <p>Personendaten werden an folgende Kategorien von Empfängern übermittelt:</p>
        <ul>
          <li><strong>Hosting & Infrastruktur:</strong> <strong>Vercel Inc.</strong> (USA) – Hosting der Next.js-Anwendung. Vercel ist unter dem EU-US Data Privacy Framework zertifiziert. Serverstandorte: primär EU (Frankfurt), ggf. USA.</li>
          <li><strong>Datenbank:</strong> <strong>Turso (LibSQL)</strong> – verwaltete SQLite-Datenbank. Serverstandorte: EU (Frankfurt) wählbar.</li>
          <li><strong>E-Mail-Versand:</strong> <strong>SMTP-Provider</strong> (konfiguriert via Umgebungsvariablen, z. B. mail.veloras.ch oder externer Anbieter wie SendGrid, Mailgun, Postmark). Der genaue Anbieter und Sitz sind in der Konfiguration ersichtlich.</li>
          <li><strong>Zahlungsdienstleister:</strong> <strong>Stripe Inc.</strong> (USA, EU-Niederlassung) – für Karten- und TWINT-Zahlungen (nach Integration). Stripe ist PCI DSS Level 1 zertifiziert und unter EU-US Data Privacy Framework zertifiziert. Wir erhalten keine vollständigen Kartendaten.</li>
          <li><strong>Versanddienstleister:</strong> {c.shippingCarrier || "[Versandpartner – À REMPLIR]"} – Name, Lieferadresse, Telefonnummer für die Zustellung.</li>
          <li><strong>Behörden / Gerichte:</strong> Auf gesetzliche Anordnung oder zur Geltendmachung/Verteidigung von Rechtsansprüchen.</li>
        </ul>
        <p>
          <strong>Internationale Datenübermittlungen:</strong> Soweit Daten in die USA übermittelt werden (Vercel, Stripe),
          stützen wir uns auf den <strong>EU-US Data Privacy Framework</strong> (Angemessenheitsbeschluss der EU-Kommission)
          sowie auf <strong>Standardvertragsklauseln</strong> der EU-Kommission. Für die Schweiz gilt das nDSG; der Bundesrat
          hat die Angemessenheit für die USA unter dem Data Privacy Framework anerkannt.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Speicherdauer / Aufbewahrungsfristen</h2>
        <p>Wir bewahren Personendaten nur so lange auf, wie es für die genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen:</p>
        <ul>
          <li><strong>Konto-Daten:</strong> Während der Dauer des Kontos + 30 Tage nach Löschung (zur Missbrauchsprävention). Auf Wunsch sofortige Löschung (Recht auf Vergessenwerden).</li>
          <li><strong>Bestell-Daten (Vertragsdaten):</strong> <strong>10 Jahre</strong> nach Ablauf des Kalenderjahres der Bestellung (gesetzliche Aufbewahrungspflicht gem. Art. 958a OR, Art. 72 MWSTG).</li>
          <li><strong>Buchhaltungsunterlagen / Rechnungen:</strong> <strong>10 Jahre</strong> (Art. 958a OR).</li>
          <li><strong>Kontaktanfragen:</strong> 2 Jahre nach letzter Korrespondenz.</li>
          <li><strong>Technische Logs (Vercel, Datenbank):</strong> Gemäss Anbieter-Richtlinien (typischerweise 30–90 Tage).</li>
          <li><strong>Cookies / localStorage (Warenkorb, Merkliste):</strong> Bis zur manuellen Löschung durch Nutzer oder Browser-Bereinigung.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>6. Cookies und lokaler Speicher</h2>
        <p>
          Details zu eingesetzten Cookies, localStorage und dem Consent-Management finden Sie in unserer
          <a href="/legal/cookies">Cookie-Richtlinie</a>.
        </p>
        <p>Zusammenfassung:</p>
        <ul>
          <li><strong>Technisch notwendige Sitzungscookies:</strong> HTTP-only, Secure, SameSite=Strict – für Login, Warenkorb-Session, CSRF-Schutz. Keine Einwilligung erforderlich.</li>
          <li><strong>localStorage (Warenkorb, Merkliste):</strong> Keine Cookies, rein clientseitig. Keine Einwilligung erforderlich.</li>
          <li><strong>Analyse-Cookies (Google Analytics, etc.):</strong> Nur nach ausdrücklicher Einwilligung via Cookie-Banner (Consent Mode v2).</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>7. Rechte der betroffenen Personen</h2>
        <p>Ihnen stehen folgende Rechte zu (gemäss nDSG / DSGVO):</p>
        <ul>
          <li><strong>Auskunftsrecht</strong> (Art. 25 nDSG / Art. 15 DSGVO): Bestätigung, ob Daten bearbeitet werden, und Zugang zu diesen Daten.</li>
          <li><strong>Recht auf Berichtigung</strong> (Art. 32 nDSG / Art. 16 DSGVO): Korrektur unrichtiger oder unvollständiger Daten.</li>
          <li><strong>Recht auf Löschung / «Vergessenwerden»</strong> (Art. 32 nDSG / Art. 17 DSGVO): Löschung, sofern keine Aufbewahrungspflicht entgegensteht.</li>
          <li><strong>Recht auf Einschränkung der Bearbeitung</strong> (Art. 32 nDSG / Art. 18 DSGVO).</li>
          <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 28 nDSG / Art. 20 DSGVO): Erhalt der Daten in strukturiertem, gängigem Format.</li>
          <li><strong>Widerspruchsrecht</strong> (Art. 30 nDSG / Art. 21 DSGVO): Widerspruch gegen Bearbeitung aufgrund berechtigten Interesses oder für Direktmarketing.</li>
          <li><strong>Widerruf der Einwilligung</strong> (Art. 31 nDSG / Art. 7 Abs. 3 DSGVO): Jederzeit mit Wirkung für die Zukunft.</li>
        </ul>
        <p>
          Zur Ausübung Ihrer Rechte wenden Sie sich an:
          <a href={`mailto:${c.privacyEmail}`}><strong>{c.privacyEmail}</strong></a>.
          Wir bearbeiten Ihr Anliegen gemäss gesetzlichen Fristen (in der Regel innerhalb von 30 Tagen).
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Beschwerderecht bei der Aufsichtsbehörde</h2>
        <p>
          Wenn Sie der Ansicht sind, dass die Bearbeitung Ihrer Personendaten gegen datenschutzrechtliche Bestimmungen verstösst,
          können Sie sich an die zuständige Aufsichtsbehörde wenden:
        </p>
        <p>
          <strong>{c.privacyAuthority || "[Aufsichtsbehörde – À REMPLIR]"}</strong>
        </p>
        <p>
          Für die Schweiz: <strong>Eidgenössischer Datenschutz- und Öffentlichkeitsbeauftragter (EDÖB)</strong>,
          Feldeggweg 1, 3003 Bern, <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener noreferrer">edoeb.admin.ch</a>.
        </p>
      </section>

      <section className="legal-section">
        <h2>9. Sicherheit der Datenverarbeitung</h2>
        <p>
          Wir treffen angemessene technische und organisatorische Massnahmen (TOMs), um Personendaten gegen zufällige oder
          vorsätzliche Manipulation, Verlust, Zerstörung oder Zugriff unberechtigter Personen zu schützen. Dazu gehören:
        </p>
        <ul>
          <li>TLS-Verschlüsselung (HTTPS) für alle Verbindungen.</li>
          <li>Passwort-Hashing mit scrypt (salted, kostenintensiv).</li>
          <li>HTTP-only, Secure, SameSite=Strict Cookies für Sitzungen.</li>
          <li>Rate-Limiting und Bot-Schutz bei Auth-Endpunkten.</li>
          <li>Zugriffsbeschränkung auf Datenbank und Admin-Bereich (Rollenbasiert).</li>
          <li>Regelmässige Sicherheitsupdates der Abhängigkeiten (Dependabot, npm audit).</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>10. Links zu Drittseiten</h2>
        <p>
          Unser Shop kann Links zu Websites Dritter enthalten (z. B. Herstellerseiten, Zahlungsanbieter). Wir haben keinen
          Einfluss auf deren Datenschutzpraktiken und übernehmen keine Verantwortung. Bitte prüfen Sie die Datenschutzerklärungen
          der jeweiligen Anbieter.
        </p>
      </section>

      <section className="legal-section">
        <h2>11. Änderungen dieser Datenschutzerklärung</h2>
        <p>
          Wir können diese Datenschutzerklärung anpassen, wenn sich unsere Datenbearbeitung oder die anwendbaren gesetzlichen
          Anforderungen ändern. Die jeweils aktuelle Fassung ist auf dieser Seite abrufbar. Bei wesentlichen Änderungen
          informieren wir Sie zusätzlich per E-Mail oder durch einen Hinweis im Shop.
        </p>
        <p><strong>Stand: November 2026</strong></p>
      </section>
    </LegalDocument>
  );
}
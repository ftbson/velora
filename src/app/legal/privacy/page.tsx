import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { companyConfig, getFormattedAddress, getSiteUrl } from "@/config/company";

const c = companyConfig;
const siteUrl = getSiteUrl("");
const address = getFormattedAddress();

export const metadata: Metadata = {
  title: "Datenschutz",
  description: c.brandName ? `Datenschutzerklärung von ${c.brandName} gemäss nLPD/DSGVO` : "Datenschutzerklärung",
  alternates: {
    canonical: getSiteUrl("/legal/privacy"),
  },
  openGraph: {
    title: "Datenschutz",
    description: c.brandName ? `${c.brandName} – Datenschutzerklärung gemäss nLPD/DSGVO` : "Datenschutzerklärung",
    url: getSiteUrl("/legal/privacy"),
    siteName: c.brandName,
    type: "website",
    locale: "de_CH",
    images: [
      {
        url: `${siteUrl}/img/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: `${c.brandName} Datenschutz`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Datenschutz",
    description: c.brandName ? `Datenschutzerklärung von ${c.brandName} gemäss nLPD/DSGVO` : "Datenschutzerklärung",
    images: [`${siteUrl}/img/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function hasCompanyInfo(): boolean {
  return !!(c.legalName || address);
}

function hasRetentionInfo(): boolean {
  return !!(
    c.dataRetentionAccountDays ||
    c.dataRetentionOrderYears ||
    c.dataRetentionInvoiceYears ||
    c.dataRetentionContactYears ||
    c.dataRetentionLogsDays
  );
}

function hasAuthorityInfo(): boolean {
  return !!(c.privacyAuthority || c.supervisoryAuthority);
}

export default function PrivacyPage() {
  if (!hasCompanyInfo()) {
    return (
      <LegalDocument
        title="Datenschutzerklärung"
        description="Die Datenschutzerklärung wird ergänzt, sobald die Firmenkonfiguration vollständig ist."
      >
        <section className="legal-section">
          <p>Die Datenschutzerklärung wird hier angezeigt, sobald alle erforderlichen Firmenangaben in der Konfiguration hinterlegt sind.</p>
          <p>Bitte füllen Sie die Datei <code>src/config/company.ts</code> vollständig aus.</p>
        </section>
      </LegalDocument>
    );
  }

  return (
    <LegalDocument
      title="Datenschutzerklärung"
      description="Informationen zur Bearbeitung personenbezogener Daten gemäss Schweizer Datenschutzgesetz (nLPD) und DSGVO."
    >
      <section className="legal-section">
        <h2>1. Verantwortliche Stelle</h2>
        <p>
          Verantwortlich für die Bearbeitung personenbezogener Daten:
        </p>
        <p>
          {c.legalName && <strong>{c.legalName}</strong>}
          {c.legalName && address && <br />}
          {address && <span>{address}</span>}
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
          <li><strong>Konto-Daten:</strong> Name, E-Mail-Adresse, verschlüsselter Passwort-Hash, Sitzungsdaten.</li>
          <li><strong>Bestell-Daten:</strong> Name, E-Mail, Telefon, Lieferadresse, bestellte Produkte, Beträge, Zahlungsart.</li>
          <li><strong>Kontaktanfragen:</strong> Name, E-Mail, optional Telefon, Nachrichteninhalte.</li>
          <li><strong>Warenkorb & Merkliste:</strong> Produkt-IDs und Mengen (localStorage, nicht kontoverknüpft).</li>
          <li><strong>Technische Daten:</strong> IP-Adresse (gekürzt), Browser, OS, Referrer, aufgerufene Seiten, Uhrzeit (Hosting/Sicherheitsdienste).</li>
          <li><strong>Zahlungsdaten:</strong> Bei Banküberweisung keine Kartendaten bei uns. Bei Karten/TWINT: Verarbeitung durch Payment Provider.</li>
        </ul>
        <p>
          <strong>Keine besonderen Kategorien von Personendaten</strong> (Gesundheit, biometrisch, politisch etc.) werden erhoben.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Zwecke und Rechtsgrundlagen</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1rem", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ background: "#f3f4f6" }}>
              <th style={{ padding: "8px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>Zweck</th>
              <th style={{ padding: "8px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>Datenkategorien</th>
              <th style={{ padding: "8px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>Rechtsgrundlage</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px" }}>Kundenkonto bereitstellen & verwalten</td>
              <td style={{ padding: "8px" }}>Konto-Daten</td>
              <td style={{ padding: "8px" }}>Vertragserfüllung</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px" }}>Bestellungen entgegennehmen, abwickeln, liefern</td>
              <td style={{ padding: "8px" }}>Bestell-Daten</td>
              <td style={{ padding: "8px" }}>Vertragserfüllung</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px" }}>Kundenanfragen beantworten</td>
              <td style={{ padding: "8px" }}>Kontaktanfragen</td>
              <td style={{ padding: "8px" }}>Vertragserfüllung / berechtigtes Interesse</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px" }}>Bestell- & Statusbenachrichtigungen</td>
              <td style={{ padding: "8px" }}>Bestell-Daten, E-Mail</td>
              <td style={{ padding: "8px" }}>Vertragserfüllung / berechtigtes Interesse</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px" }}>Zahlungsabwicklung</td>
              <td style={{ padding: "8px" }}>Bestell-Daten, Zahlungsdaten</td>
              <td style={{ padding: "8px" }}>Vertragserfüllung</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px" }}>Website-Sicherheit, Missbrauchsprävention</td>
              <td style={{ padding: "8px" }}>Technische Daten, IP</td>
              <td style={{ padding: "8px" }}>Berechtigtes Interesse</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "8px" }}>Gesetzliche Aufbewahrungspflichten</td>
              <td style={{ padding: "8px" }}>Bestell-Daten, Rechnungen</td>
              <td style={{ padding: "8px" }}>Rechtliche Verpflichtung</td>
            </tr>
            <tr>
              <td style={{ padding: "8px" }}>Analyse & Optimierung (nach Einwilligung)</td>
              <td style={{ padding: "8px" }}>Technische Daten, Nutzungsverhalten</td>
              <td style={{ padding: "8px" }}>Einwilligung</td>
            </tr>
          </tbody>
        </table>
        <p><strong>Keine automatisierte Entscheidungsfindung / Profiling</strong> im Sinne von Art. 22 DSGVO.</p>
      </section>

      <section className="legal-section">
        <h2>4. Empfänger</h2>
        <p>Personendaten werden an folgende Kategorien von Empfängern übermittelt:</p>
        <ul>
          <li><strong>Hosting & Infrastruktur:</strong> Vercel Inc. (USA/EU) – EU-US Data Privacy Framework zertifiziert.</li>
          <li><strong>Datenbank:</strong> Turso (LibSQL) – Serverstandort EU wählbar.</li>
          <li><strong>E-Mail-Versand:</strong> SMTP-Provider (konfiguriert via Umgebungsvariablen).</li>
          {c.paymentProviders.some(p => p.includes("Stripe")) && (
            <li><strong>Zahlungsdienstleister:</strong> Stripe Inc. (USA/EU) – PCI DSS Level 1, EU-US Data Privacy Framework.</li>
          )}
          {c.shippingCarrier && (
            <li><strong>Versanddienstleister:</strong> {c.shippingCarrier} – Name, Lieferadresse, Telefon für Zustellung.</li>
          )}
          <li><strong>Behörden / Gerichte:</strong> Auf gesetzliche Anordnung oder zur Rechtsdurchsetzung.</li>
        </ul>
        <p>
          Internationale Datenübermittlungen in die USA stützen sich auf den <strong>EU-US Data Privacy Framework</strong>
          sowie <strong>Standardvertragsklauseln</strong>. Für die Schweiz gilt das nDSG; der Bundesrat hat die Angemessenheit
          für die USA unter dem Data Privacy Framework anerkannt.
        </p>
      </section>

      {hasRetentionInfo() && (
        <section className="legal-section">
          <h2>5. Speicherdauer / Aufbewahrungsfristen</h2>
          <p>Wir bewahren Personendaten nur so lange auf, wie erforderlich oder gesetzlich vorgeschrieben:</p>
          <ul>
            {c.dataRetentionAccountDays && (
              <li><strong>Konto-Daten:</strong> Während der Kontodauer + {c.dataRetentionAccountDays} Tage nach Löschung.</li>
            )}
            {c.dataRetentionOrderYears && (
              <li><strong>Bestell-Daten (Vertragsdaten):</strong> <strong>{c.dataRetentionOrderYears} Jahre</strong> nach Ablauf des Kalenderjahres (Art. 958a OR).</li>
            )}
            {c.dataRetentionInvoiceYears && (
              <li><strong>Buchhaltungsunterlagen / Rechnungen:</strong> <strong>{c.dataRetentionInvoiceYears} Jahre</strong> (Art. 958a OR).</li>
            )}
            {c.dataRetentionContactYears && (
              <li><strong>Kontaktanfragen:</strong> {c.dataRetentionContactYears} Jahre nach letzter Korrespondenz.</li>
            )}
            {c.dataRetentionLogsDays && (
              <li><strong>Technische Logs:</strong> {c.dataRetentionLogsDays} Tage.</li>
            )}
            <li><strong>Cookies / localStorage (Warenkorb, Merkliste):</strong> Bis zur manuellen Löschung.</li>
          </ul>
        </section>
      )}

      <section className="legal-section">
        <h2>6. Cookies und lokaler Speicher</h2>
        <p>
          Details zu Cookies, localStorage und Consent-Management finden Sie in unserer
          <a href="/legal/cookies">Cookie-Richtlinie</a>.
        </p>
        <ul>
          <li><strong>Technisch notwendige Sitzungscookies:</strong> HTTP-only, Secure, SameSite=Strict – Login, Warenkorb, CSRF.</li>
          <li><strong>localStorage (Warenkorb, Merkliste):</strong> Clientseitig, keine Cookies.</li>
          <li><strong>Analyse-Cookies:</strong> Nur nach Einwilligung via Cookie-Banner (Consent Mode v2).</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>7. Rechte der betroffenen Personen</h2>
        <p>Ihnen stehen folgende Rechte zu (nDSG / DSGVO):</p>
        <ul>
          <li><strong>Auskunftsrecht</strong> (Art. 25 nDSG / Art. 15 DSGVO)</li>
          <li><strong>Recht auf Berichtigung</strong> (Art. 32 nDSG / Art. 16 DSGVO)</li>
          <li><strong>Recht auf Löschung / «Vergessenwerden»</strong> (Art. 32 nDSG / Art. 17 DSGVO)</li>
          <li><strong>Recht auf Einschränkung</strong> (Art. 32 nDSG / Art. 18 DSGVO)</li>
          <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 28 nDSG / Art. 20 DSGVO)</li>
          <li><strong>Widerspruchsrecht</strong> (Art. 30 nDSG / Art. 21 DSGVO)</li>
          <li><strong>Widerruf der Einwilligung</strong> (Art. 31 nDSG / Art. 7 Abs. 3 DSGVO)</li>
        </ul>
        <p>
          Zur Ausübung Ihrer Rechte wenden Sie sich an:
          <a href={`mailto:${c.privacyEmail}`}><strong>{c.privacyEmail}</strong></a>.
        </p>
      </section>

      {hasAuthorityInfo() && (
        <section className="legal-section">
          <h2>8. Aufsichtsbehörde / Beschwerderecht</h2>
          {c.privacyAuthority && (
            <p><strong>{c.privacyAuthority}</strong></p>
          )}
          {c.supervisoryAuthority && (
            <p><strong>Branchenspezifische Aufsichtsbehörde:</strong> {c.supervisoryAuthority}</p>
          )}
          <p>
            Für die Schweiz: <strong>Eidgenössischer Datenschutz- und Öffentlichkeitsbeauftragter (EDÖB)</strong>,
            Feldeggweg 1, 3003 Bern, <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener noreferrer">edoeb.admin.ch</a>.
          </p>
        </section>
      )}

      {c.osPlatformUrl && (
        <section className="legal-section">
          <h2>9. Streitschlichtung (OS-Plattform)</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:
            <a href={c.osPlatformUrl} target="_blank" rel="noopener noreferrer">
              {c.osPlatformUrl}
            </a>
          </p>
        </section>
      )}

      <section className="legal-section">
        <h2>10. Sicherheit</h2>
        <p>Wir treffen angemessene technische und organisatorische Massnahmen:</p>
        <ul>
          <li>TLS-Verschlüsselung (HTTPS) für alle Verbindungen</li>
          <li>Passwort-Hashing mit scrypt (salted)</li>
          <li>HTTP-only, Secure, SameSite=Strict Cookies</li>
          <li>Rate-Limiting und Bot-Schutz</li>
          <li>Rollenbasierte Zugriffsbeschränkung</li>
          <li>Regelmässige Sicherheitsupdates (Dependabot, npm audit)</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>11. Links zu Drittseiten</h2>
        <p>
          Unser Shop kann Links zu Websites Dritter enthalten. Wir haben keinen Einfluss auf deren Datenschutzpraktiken
          und übernehmen keine Verantwortung. Prüfen Sie die Datenschutzerklärungen der jeweiligen Anbieter.
        </p>
      </section>

      <section className="legal-section">
        <h2>12. Änderungen</h2>
        <p>
          Wir können diese Datenschutzerklärung anpassen. Die aktuelle Fassung ist auf dieser Seite abrufbar.
          Bei wesentlichen Änderungen informieren wir zusätzlich per E-Mail oder im Shop.
        </p>
      </section>
    </LegalDocument>
  );
}
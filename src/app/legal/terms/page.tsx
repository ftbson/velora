import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { companyConfig, getFormattedAddress, getSiteUrl } from "@/config/company";

const c = companyConfig;
const siteUrl = getSiteUrl("");
const address = getFormattedAddress();

export const metadata: Metadata = {
  title: "AGB",
  description: c.brandName ? `Allgemeine Geschäftsbedingungen für Bestellungen im ${c.brandName} Onlineshop` : "Allgemeine Geschäftsbedingungen",
  alternates: {
    canonical: getSiteUrl("/legal/terms"),
  },
  openGraph: {
    title: "AGB",
    description: c.brandName ? `${c.brandName} – Allgemeine Geschäftsbedingungen` : "Allgemeine Geschäftsbedingungen",
    url: getSiteUrl("/legal/terms"),
    siteName: c.brandName,
    type: "website",
    locale: "de_CH",
    images: [
      {
        url: `${siteUrl}/img/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: `${c.brandName} AGB`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AGB",
    description: c.brandName ? `Allgemeine Geschäftsbedingungen für Bestellungen bei ${c.brandName}` : "Allgemeine Geschäftsbedingungen",
    images: [`${siteUrl}/img/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function hasContent(): boolean {
  return !!(
    c.legalName ||
    c.legalForm ||
    address ||
    c.uid ||
    c.vatNumber ||
    c.responsiblePerson ||
    c.paymentProviders.length > 0 ||
    c.deliveryTimeText ||
    c.shippingCarrier ||
    c.returnPeriodDays ||
    c.returnRefundDurationDays ||
    c.returnShippingCostPolicy ||
    c.warrantyText ||
    c.damageReportDays ||
    c.city ||
    c.country
  );
}

export default function TermsPage() {
  if (!hasContent()) {
    return (
      <LegalDocument
        title="Allgemeine Geschäftsbedingungen (AGB)"
        description="Die AGB werden ergänzt, sobald die Firmenkonfiguration vollständig ist."
      >
        <section className="legal-section">
          <p>Die Allgemeinen Geschäftsbedingungen werden hier angezeigt, sobald alle erforderlichen Firmenangaben in der Konfiguration hinterlegt sind.</p>
          <p>Bitte füllen Sie die Datei <code>src/config/company.ts</code> vollständig aus.</p>
        </section>
      </LegalDocument>
    );
  }

  return (
    <LegalDocument
      title="Allgemeine Geschäftsbedingungen (AGB)"
      description="Vertragsbedingungen für Bestellungen. Bitte lesen Sie diese AGB sorgfältig durch."
    >
      {(c.legalName || c.legalForm || address || c.uid) && (
        <section className="legal-section">
          <h2>1. Anbieter und Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen gelten für alle Bestellungen über den Onlineshop <strong>{c.brandName}</strong>.
          </p>
          <p>
            Anbieter und Vertragspartner:
          </p>
          <p>
            {c.legalName && <strong>{c.legalName}</strong>}
            {c.legalName && c.legalForm && <br />}
            {c.legalForm && <span>{c.legalForm}</span>}
            {address && (
              <>
                {(c.legalName || c.legalForm) && <br />}
                <span>{address}</span>
              </>
            )}
            {c.uid && (
              <>
                {(c.legalName || c.legalForm || address) && <br />}
                <span>UID: {c.uid}</span>
              </>
            )}
            <br />
            E-Mail: <a href={`mailto:${c.email}`}>{c.email}</a>
            <br />
            Telefon: <a href={`tel:${c.phoneRaw}`}>{c.phone}</a>
          </p>
        </section>
      )}

      {c.paymentProviders.length > 0 && (
        <section className="legal-section">
          <h2>2. Zahlung</h2>
          <p>Folgende Zahlungsarten werden angeboten:</p>
          <ul>
            {c.paymentProviders.map((provider, idx) => (
              <li key={idx}>{provider}</li>
            ))}
          </ul>
          {c.paymentProviders.includes("Banküberweisung") && c.paymentDeadlineDays && (
            <p>
              <strong>Bei Banküberweisung:</strong> Der Rechnungsbetrag ist innerhalb von <strong>{c.paymentDeadlineDays} Tagen</strong>
              ab Bestellbestätigung zu überweisen. Die Ware wird erst nach Geldeingang versandt.
            </p>
          )}
        </section>
      )}

      {(c.deliveryTimeText || c.shippingCarrier) && (
        <section className="legal-section">
          <h2>3. Lieferung und Versand</h2>
          {c.deliveryTimeText && (
            <p>
              <strong>Lieferzeit:</strong> {c.deliveryTimeText} nach Vertragsschluss (bei Vorkasse nach Zahlungseingang).
            </p>
          )}
          {c.shippingCarrier && (
            <p>
              <strong>Versanddienstleister:</strong> {c.shippingCarrier}.
            </p>
          )}
          <p>
            Die Lieferung erfolgt an Adressen in der Schweiz und in Liechtenstein. Der Versand ist kostenlos.
          </p>
        </section>
      )}

      {c.returnPeriodDays && (
        <section className="legal-section">
          <h2>4. Widerrufsrecht</h2>
          <p>
            Verbrauchern steht ein Widerrufsrecht von <strong>{c.returnPeriodDays} Tagen</strong> zu.
            Die Frist beginnt am Tag, an dem Sie oder ein von Ihnen benannter Dritter die Waren in Besitz genommen haben.
          </p>
          {c.returnShippingCostPolicy && (
            <p>
              <strong>Rücksendekosten:</strong> {c.returnShippingCostPolicy}.
            </p>
          )}
          {c.returnRefundDurationDays && (
            <p>
              <strong>Rückerstattung:</strong> Unverzüglich und spätestens binnen <strong>{c.returnRefundDurationDays} Tagen</strong>
              ab Eingang der Widerrufserklärung, über dasselbe Zahlungsmittel.
            </p>
          )}
          <p>
            Das Widerrufsrecht besteht nicht bei massgefertigten Waren, versiegelten Hygieneartikeln nach Entfernung der Versiegelung
            sowie bei digitalen Inhalten, deren Ausführung mit Ihrer Zustimmung vor Fristablauf begonnen hat.
          </p>
        </section>
      )}

      {c.warrantyText && (
        <section className="legal-section">
          <h2>5. Gewährleistung und Garantie</h2>
          <p>{c.warrantyText}</p>
          <p>
            Gesetzliche Gewährleistungsrechte bleiben unberührt. Bei Mängeln wenden Sie sich an
            <a href={`mailto:${c.email}`}>{c.email}</a>.
          </p>
        </section>
      )}

      {c.damageReportDays && (
        <section className="legal-section">
          <h2>6. Beanstandungen und Transportschäden</h2>
          <p>
            Bitte prüfen Sie die Lieferung sofort. Offensichtliche Mängel oder Transportschäden melden Sie bitte
            innerhalb von <strong>{c.damageReportDays} Werktagen</strong> nach Erhalt an
            <a href={`mailto:${c.email}`}>{c.email}</a>.
            Ihre gesetzlichen Rechte werden durch diese Frist nicht eingeschränkt.
          </p>
        </section>
      )}

      {(c.city && c.country) && (
        <section className="legal-section">
          <h2>7. Anwendbares Recht und Gerichtsstand</h2>
          <p>
            Es gilt Schweizer Recht unter Ausschluss des UN-Kaufrechts (CISG).
          </p>
          <p>
            Ausschliesslicher Gerichtsstand für Streitigkeiten ist der Sitz von {c.brandName}
            ({c.city}, {c.country}), sofern gesetzlich zulässig.
          </p>
        </section>
      )}

      {c.legalName && (
        <section className="legal-section">
          <h2>8. Salvatorische Klausel</h2>
          <p>
            Sollte eine Bestimmung unwirksam sein, bleibt die Wirksamkeit der übrigen unberührt.
            An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung, die dem wirtschaftlichen
            Zweck am nächsten kommt.
          </p>
        </section>
      )}
    </LegalDocument>
  );
}
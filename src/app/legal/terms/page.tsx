import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { companyConfig, getFormattedAddress } from "@/config/company";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen (AGB)",
  description: "Allgemeine Geschäftsbedingungen für Bestellungen im VELORA Onlineshop – Vertragsschluss, Preise, Lieferung, Zahlung, Widerruf, Gewährleistung, anwendbares Recht.",
};

export default function TermsPage() {
  const c = companyConfig;
  const address = getFormattedAddress();

  return (
    <LegalDocument
      title="Allgemeine Geschäftsbedingungen (AGB)"
      description="Vertragsbedingungen für Bestellungen bei VELORA. Bitte lesen Sie diese AGB sorgfältig durch."
    >
      <section className="legal-section">
        <h2>1. Geltungsbereich und Anbieter</h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen (nachfolgend «AGB») gelten für alle Bestellungen, die Verbraucher und Unternehmen
          (nachfolgend «Kunde») über den Onlineshop <strong>{c.brandName}</strong> (nachfolgend «Shop») tätigen.
        </p>
        <p>
          Anbieter und Vertragspartner ist:
        </p>
        <p>
          {c.legalName ? <strong>{c.legalName}</strong> : <em className="missing-field">[Raison sociale – À REMPLIR]</em>}
          <br />
          {c.legalForm ? c.legalForm : <em className="missing-field">[Rechtsform – À REMPLIR]</em>}
          <br />
          {address || <em className="missing-field">[Adresse – À REMPLIR]</em>}
          <br />
          UID: {c.uid || <em className="missing-field">[UID – À REMPLIR]</em>}
          <br />
          E-Mail: <a href={`mailto:${c.email}`}>{c.email}</a>
          <br />
          Telefon: <a href={`tel:${c.phoneRaw}`}>{c.phone}</a>
        </p>
        <p>
          Abweichende AGB des Kunden werden nicht anerkannt, es sei denn, VELORA stimmt ihrer Geltung ausdrücklich schriftlich zu.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Vertragssprache, Vertragstextspeicherung</h2>
        <p>
          Die Vertragssprache ist Deutsch. Der Vertragstext wird von VELORA gespeichert und dem Kunden per E-Mail (Bestellbestätigung)
          zugesendet. Der Kunde kann die AGB jederzeit unter <a href="/legal/terms">/legal/terms</a> einsehen und herunterladen.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Produkte und Verfügbarkeit</h2>
        <p>
          Die Darstellung der Produkte im Shop stellt kein rechtlich bindendes Angebot dar, sondern eine Aufforderung zur Abgabe
          einer Bestellung (invitatio ad offerendum). Abbildungen können vom gelieferten Produkt abweichen (Farbabweichungen,
          technische Weiterentwicklungen). Die Verfügbarkeit der Produkte wird im Shop angezeigt; sie ist unverbindlich.
          Zwischenverkauf bleibt vorbehalten.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Preise und Mehrwertsteuer</h2>
        <p>
          Alle Preise verstehen sich in <strong>Schweizer Franken (CHF)</strong> und enthalten die gesetzliche Mehrwertsteuer
          (sofern VELORA mehrwertsteuerpflichtig ist; {c.vatNumber ? `MWST-Nr.: ${c.vatNumber}` : "derzeit nicht MWST-pflichtig"}).
          Der Versand ist für Lieferungen in die Schweiz und nach Liechtenstein <strong>kostenlos</strong>.
        </p>
        <p>
          Massgeblich ist der Preis, der zum Zeitpunkt der Bestellung im Shop angezeigt wird. Preisänderungen und Irrtümer bleiben vorbehalten.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Bestellvorgang und Vertragsschluss</h2>
        <ol>
          <li>Der Kunde wählt Produkte aus und legt sie in den Warenkorb.</li>
          <li>Im Checkout gibt der Kunde seine Liefer- und Kontaktdaten ein und wählt die Zahlungsart.</li>
          <li>Durch Klick auf den Button «Zahlungspflichtig bestellen» / «Bestellen» gibt der Kunde ein verbindliches Angebot
            zum Abschluss eines Kaufvertrags ab.</li>
          <li>VELORA bestätigt den Eingang der Bestellung automatisch per E-Mail (Bestellbestätigung). Diese Bestätigung stellt
            noch keine Annahme des Angebots dar.</li>
          <li>Der Kaufvertrag kommt zustande, sobald VELORA die Bestellung durch eine gesonderte E-Mail (Auftragsbestätigung /
            Versandbestätigung) annimmt oder die Ware versendet.</li>
        </ol>
        <p>
          VELORA ist berechtigt, Bestellungen ohne Angabe von Gründen abzulehnen (z. B. bei Verdacht auf gewerblichen Weiterverkauf,
          ungewöhnlichen Bestellmengen oder Zahlungsausfällen in der Vergangenheit).Bereits geleistete Zahlungen werden in diesem Fall
          unverzüglich zurückerstattet.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Zahlung</h2>
        <p>
          Folgende Zahlungsarten werden angeboten:
        </p>
        <ul>
          {c.paymentProviders.map((provider, idx) => (
            <li key={idx}>{provider}</li>
          ))}
        </ul>
        <p>
          Bei <strong>Banküberweisung</strong> ist der Rechnungsbetrag innerhalb von <strong>{c.paymentDeadlineDays} Tagen</strong>
          ab Bestellbestätigung auf das angegebene Konto zu überweisen. Der Verwendungszweck muss die Bestellnummer enthalten.
          Die Ware wird erst nach Geldeingang versandt. Gerät der Kunde in Verzug, ist VELORA berechtigt, Verzugszinsen in
          gesetzlicher Höhe zu fordern und die Bestellung nach Mahnung zu stornieren.
        </p>
        <p>
          Bei <strong>Kartenzahlung / TWINT</strong> (nach Integration) erfolgt die Belastung unmittelbar bei Bestellabschluss.
          Die Zahlungsabwicklung erfolgt über den jeweiligen Payment Service Provider (z. B. Stripe). VELORA erhält keine
          vollständigen Kartendaten.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Lieferung und Versand</h2>
        <p>
          Die Lieferung erfolgt an die vom Kunden im Checkout angegebene Lieferadresse in der Schweiz oder in Liechtenstein.
          <strong>Lieferzeit:</strong> {c.deliveryTimeText || "2 bis 4 Werktage"} nach Vertragsschluss (bei Vorkasse nach Zahlungseingang).
        </p>
        <p>
          <strong>Versanddienstleister:</strong> {c.shippingCarrier || "[Versandpartner – À REMPLIR]"}.
        </p>
        <p>
          Teillieferungen sind zulässig, soweit sie dem Kunden zumutbar sind. Zusätzliche Versandkosten entstehen dem Kunden
          durch Teillieferungen nicht. Ist die Lieferung nicht zustellbar (falsche Adresse, Abwesenheit, Annahmeverweigerung),
          trägt der Kunde die Kosten der Rücksendung und einer allfälligen erneuten Zustellung.
        </p>
        <p>
          Lieferverzögerungen durch höhere Gewalt, Arbeitskämpfe, behördliche Anordnungen oder Störungen bei Versandpartnern
          berechtigen VELORA, die Lieferfrist angemessen zu verlängern. Der Kunde wird unverzüglich informiert.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Eigentumsvorbehalt</h2>
        <p>
          Die gelieferte Ware bleibt bis zur vollständigen Bezahlung aller Forderungen aus dem Kaufvertrag im Eigentum von VELORA.
        </p>
      </section>

      <section className="legal-section">
        <h2>9. Widerrufsrecht für Verbraucher</h2>
        <p>
          Verbrauchern (natürliche Personen, die zu Zwecken handeln, die überwiegend weder ihrer gewerblichen noch ihrer
          selbstständigen beruflichen Tätigkeit zugerechnet werden können) steht ein gesetzliches Widerrufsrecht zu.
        </p>
        <h3>Widerrufsbelehrung</h3>
        <p>
          <strong>Widerrufsrecht</strong>
        </p>
        <p>
          Sie haben das Recht, binnen <strong>{c.returnPeriodDays} Tagen</strong> ohne Angabe von Gründen diesen Vertrag zu widerrufen.
          Die Widerrufsfrist beträgt {c.returnPeriodDays} Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter
          (der nicht der Beförderer ist) die Waren in Besitz genommen haben.
        </p>
        <p>
          Um Ihr Widerrufsrecht auszuüben, müssen Sie uns ({c.legalName || "[Firmenname]"}, {address || "[Adresse]"},
          E-Mail: <a href={`mailto:${c.email}`}>{c.email}</a>, Telefon: <a href={`tel:${c.phoneRaw}`}>{c.phone}</a>)
          mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss,
          diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden,
          das jedoch nicht vorgeschrieben ist.
        </p>
        <p>
          Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts
          vor Ablauf der Widerrufsfrist absenden.
        </p>
        <h3>Folgen des Widerrufs</h3>
        <p>
          Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben,
          einschliesslich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie
          eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben),
          unverzüglich und spätestens binnen <strong>{c.returnRefundDurationDays} Tagen</strong> ab dem Tag zurückzuzahlen,
          an dem die Mitteilung über Ihren Widerruf bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe
          Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, sofern nicht ausdrücklich etwas
          anderes vereinbart wurde; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
        </p>
        <p>
          Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis
          erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist.
        </p>
        <p>
          Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen {c.returnPeriodDays} Tagen ab dem Tag,
          an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden oder zu übergeben.
          Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von {c.returnPeriodDays} Tagen absenden.
        </p>
        <p>
          <strong>Rücksendekosten:</strong> {c.returnShippingCostPolicy || "[Rücksendekosten-Regelung – À REMPLIR]"}.
        </p>
        <p>
          Sie müssen für einen allfälligen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zur
          Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit ihnen
          zurückzuführen ist.
        </p>
        <h3>Ausschluss des Widerrufsrechts</h3>
        <p>
          Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die nach Kundenspezifikationen angefertigt
          wurden oder eindeutig auf die persönlichen Bedürfnisse zugeschnitten sind, sowie bei versiegelten Waren, die aus
          Gründen des Gesundheitsschutzes oder der Hygiene nicht zur Rückgabe geeignet sind, wenn ihre Versiegelung nach der
          Lieferung entfernt wurde.
        </p>
      </section>

      <section className="legal-section">
        <h2>10. Gewährleistung und Garantie</h2>
        <p>
          Es gelten die gesetzlichen Gewährleistungsrechte (Mängelhaftung) gemäss Schweizer Obligationenrecht (OR).
          Die Gewährleistungsfrist beträgt <strong>2 Jahre</strong> ab Lieferung der Ware.
        </p>
        <p>
          <strong>Herstellergarantie:</strong> {c.warrantyText || "[Garantiebedingungen – À REMPLIR]"}.
          Eine allfällige Herstellergarantie schränkt die gesetzlichen Gewährleistungsrechte nicht ein.
        </p>
        <p>
          Bei Mängeln wenden Sie sich bitte an <a href={`mailto:${c.email}`}>{c.email}</a> mit Beschreibung und
          wenn möglich Fotos des Mangels. Wir prüfen den Fall und regeln die weitere Abwicklung (Nachbesserung,
          Ersatzlieferung, Preisminderung oder Rücktritt).
        </p>
      </section>

      <section className="legal-section">
        <h2>11. Haftung</h2>
        <p>
          VELORA haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit. Für leichte Fahrlässigkeit haftet VELORA nur
          bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) und beschränkt auf den vertragstypischen,
          vorhersehbaren Schaden. Die Haftung für mittelbare Schäden, entgangenen Gewinn und Folgeschäden ist ausgeschlossen,
          soweit gesetzlich zulässig. Die vorstehenden Haftungsbeschränkungen gelten nicht bei Verletzung von Leben,
          Körper und Gesundheit sowie bei zwingender gesetzlicher Haftung (z. B. Produkthaftpflichtgesetz).
        </p>
      </section>

      <section className="legal-section">
        <h2>12. Datenschutz</h2>
        <p>
          Informationen zur Bearbeitung personenbezogener Daten finden Sie in unserer
          <a href="/legal/privacy">Datenschutzerklärung</a>.
        </p>
      </section>

      <section className="legal-section">
        <h2>13. Anwendbares Recht und Gerichtsstand</h2>
        <p>
          Auf alle Rechtsbeziehungen zwischen VELORA und dem Kunden ist <strong>Schweizer Recht</strong> anwendbar,
          unter Ausschluss des UN-Kaufrechts (CISG).
        </p>
        <p>
          Ausschliesslicher Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit dem Vertragsverhältnis
          ist der Sitz von VELORA ({c.city || "[Ort]"}, {c.country || "Schweiz"}), sofern der Kunde Kaufmann,
          juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist oder keinen
          allgemeinen Gerichtsstand in der Schweiz hat. VELORA ist jedoch berechtigt, den Kunden auch an dessen
          Wohnsitzgericht zu belangen.
        </p>
      </section>

      <section className="legal-section">
        <h2>14. Salvatorische Klausel</h2>
        <p>
          Sollte eine Bestimmung dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen
          unberührt. An die Stelle der unwirksamen Bestimmung tritt diejenige gesetzliche Regelung, die dem wirtschaftlichen
          Zweck der unwirksamen Bestimmung am nächsten kommt.
        </p>
      </section>

      <section className="legal-section">
        <h2>15. Stand und Änderungen</h2>
        <p>
          Stand: <strong>November 2026</strong>. VELORA behält sich vor, diese AGB jederzeit zu ändern. Für bereits
          getätigte Bestellungen gilt die Fassung der AGB zum Zeitpunkt der Bestellung.
        </p>
      </section>
    </LegalDocument>
  );
}
import { companyConfig } from "@/config/company";
import { getFormattedAddress } from "@/config/company";
import ContactForm from "./ContactForm";

const c = companyConfig;
const address = getFormattedAddress();

export const metadata = {
  title: "Kontakt | VELORA",
  description: "Kontaktieren Sie VELORA – Ihr Schweizer E-Bike Shop. Telefon, E-Mail, Kontaktformular. Kostenlose Lieferung CH & LI.",
  openGraph: {
    title: "Kontakt | VELORA",
    description: "Kontaktieren Sie VELORA – Ihr Schweizer E-Bike Shop.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <h1>Kontakt</h1>
        <p>Haben Sie Fragen? Wir helfen Ihnen gerne weiter.</p>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <h2>Kontaktieren Sie uns</h2>

          <div className="contact-methods">
            <a href={`tel:${c.phoneRaw}`} className="contact-method">
              <div className="contact-method-icon">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div>
                <h3>Telefon</h3>
                <p>{c.phone}</p>
                <small>{c.openingHours || "Mo–Fr 08:30–18:00, Sa 09:00–16:00"}</small>
              </div>
            </a>

            <a href={`mailto:${c.email}`} className="contact-method">
              <div className="contact-method-icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div>
                <h3>E-Mail</h3>
                <p>{c.email}</p>
                <small>Antwort meist innerhalb 24h</small>
              </div>
            </a>

            {address && (
              <div className="contact-method contact-address">
                <div className="contact-method-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <h3>Adresse</h3>
                  <address>{address.replace(/, /g, ", ")}</address>
                  <small>Besuche nach Vereinbarung</small>
                </div>
              </div>
            )}
          </div>

          <div className="contact-quick-links">
            <h3>Häufige Anliegen</h3>
            <ul>
              <li><a href="/legal/versand-retouren">Versand & Rückgabe</a></li>
              <li><a href="/legal/terms">AGB</a></li>
              <li><a href="/legal/privacy">Datenschutz</a></li>
              <li><a href="/legal/cookies">Cookie-Einstellungen</a></li>
              <li><a href="/konto/bestellungen">Meine Bestellungen</a></li>
            </ul>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <h2>Nachricht senden</h2>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
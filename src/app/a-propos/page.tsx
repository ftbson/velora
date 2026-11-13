import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { companyConfig, getFormattedAddress } from "@/config/company";

export const metadata: Metadata = {
  title: "Über VELORA",
  description: "VELORA – Ihr Schweizer Fachhändler für Premium E-Bikes, Fahrräder, Zubehör und Bekleidung. Erfahren Sie mehr über uns, unsere Marken und unseren Service.",
};

const categories = [
  {
    name: "City-E-Bikes",
    title: "Für die Stadt",
    description: "Entdecken Sie Modelle für tägliche Wege und urbane Mobilität.",
    href: "/kategorie/ville",
  },
  {
    name: "Trekking-E-Bikes",
    title: "Für Alltag und Touren",
    description: "Finden Sie E-Bikes für vielseitige Wege und längere Ausfahrten.",
    href: "/kategorie/vtc",
  },
  {
    name: "E-Mountainbikes",
    title: "Für Wege abseits der Stadt",
    description: "Sehen Sie sich unsere Auswahl für Gelände und anspruchsvollere Strecken an.",
    href: "/kategorie/vtt",
  },
];

export default function AboutPage() {
  const c = companyConfig;
  const address = getFormattedAddress();

  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="storefront-eyebrow">{c.brandName} – SWISS E-BIKE SPECIALIST</p>
          <h1>Das Passende für Ihre nächste Tour.</h1>
          <p>
            {c.brandName} ist Ihr Schweizer Onlineshop für Premium E-Bikes, Fahrräder, Zubehör und Fahrradbekleidung.
            Wir führen sorgfältig ausgewählte Modelle renommierter Marken – mit Fokus auf Qualität, Service und
            nachhaltige Mobilität in der Schweiz und Liechtenstein.
          </p>
          <div className="about-actions">
            <Link href="/products" className="storefront-primary-link">
              Sortiment entdecken
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </Link>
            <Link href="/kontakt" className="storefront-secondary-link">
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
        <div className="about-hero-aside" aria-hidden="true">
          <span>{c.brandName}</span>
          <span>City · Trekking · Mountainbike · Zubehör · Bekleidung</span>
        </div>
      </section>

      <section className="about-values">
        <div className="about-section-heading">
          <p className="storefront-eyebrow">UNSER ANSPRUCH</p>
          <h2>Einfacher zum passenden Modell</h2>
          <p>
            Gute Orientierung beginnt mit den Fragen, die im Alltag zählen:
            Wo fahren Sie, welche Strecken planen Sie und welches Modell passt
            zu Ihren Anforderungen?
          </p>
        </div>
        <div className="about-value-grid">
          <article>
            <span>01</span>
            <h3>Nach Einsatzbereich sortiert</h3>
            <p>
              Die Kategorien City-E-Bikes, Trekking-E-Bikes und
              E-Mountainbikes helfen Ihnen, die Auswahl nach geplantem
              Einsatzbereich einzugrenzen.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Modelle vergleichen</h3>
            <p>
              Produktseiten bündeln die verfügbaren Angaben zu den einzelnen
              Modellen. Prüfen Sie die Details, bevor Sie Ihre Wahl treffen.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Fragen? Wir sind erreichbar</h3>
            <p>
              Über unser Kontaktformular können Sie Fragen zu Produkten und
              Bestellungen an unser Team richten. Telefonisch beraten wir Sie
              gerne zu Öffnungszeiten.
            </p>
          </article>
        </div>
      </section>

      <section className="about-category-section">
        <div className="about-section-heading">
          <p className="storefront-eyebrow">DREI KATEGORIEN</p>
          <h2>Finde deinen Einsatzbereich</h2>
        </div>
        <div className="about-category-grid">
          {categories.map((category) => (
            <Link
              className="about-category-card"
              href={category.href}
              key={category.name}
            >
              <span>{category.name}</span>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <span className="about-category-link">
                Kategorie ansehen
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Unternehmensprofil für Vertrauen & Google Merchant Center */}
      <section className="about-company-profile" style={{ padding: "4rem 1.5rem", background: "#fafafa" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1.5rem", textAlign: "center" }}>
            {c.brandName} – Ihr Schweizer Fachhändler
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            <div>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.75rem" }}>Wer wir sind</h3>
              <p style={{ lineHeight: 1.7, color: "#374151" }}>
                {c.brandName} ({c.legalName || "VELORA"}) ist ein in der Schweiz ansässiges Unternehmen
                mit Fokus auf den Vertrieb von hochwertigen E-Bikes, Fahrrädern, Zubehör und Fahrradbekleidung.
                Unser Sortiment richtet sich an Pendler, Tourenfahrer, Familien und Sportbegeisterte, die
                Wert auf Qualität, Beratung und zuverlässigen Service legen.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.75rem" }}>Unsere Marken</h3>
              <p style={{ lineHeight: 1.7, color: "#374151" }}>
                Wir führen Modelle von <strong>CUBE</strong>, <strong>Benno Bikes</strong>, <strong>O2FEEL</strong>,
                <strong>Granville</strong>, <strong>ORBEA</strong>, <strong>MONDRAKER</strong>, <strong>FOCUS</strong>,
                <strong>GITANE</strong>, <strong>ROCK MACHINE</strong>, <strong>Cannondale</strong>, <strong>PUKY</strong>,
                <strong>ACADEMY</strong> sowie Zubehör und Bekleidung von <strong>VAUDE</strong>, <strong>Gonso</strong>,
                <strong>ACID</strong>, <strong>Shimano</strong>, <strong>SIGMA</strong>, <strong>ABUS</strong>,
                <strong>CamelBak</strong>, <strong>Zimtstern</strong> und weiteren.
                {c.authorizedDealer && <strong> Wir sind offizieller Fachhändler für alle angebotenen Marken.</strong>}
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.75rem" }}>Standort & Kontakt</h3>
              <address style={{ fontStyle: "normal", lineHeight: 1.8, color: "#374151" }}>
                {address ? (
                  <>
                    <strong>{c.legalName || c.brandName}</strong><br />
                    {c.street}<br />
                    {c.postalCode} {c.city}<br />
                    {c.country}<br /><br />
                    <a href={`tel:${c.phoneRaw}`} style={{ color: "#D52B1E", textDecoration: "none" }}>{c.phone}</a><br />
                    <a href={`mailto:${c.email}`} style={{ color: "#D52B1E", textDecoration: "none" }}>{c.email}</a><br />
                    {c.openingHours && <>Öffnungszeiten: {c.openingHours}</>}
                  </>
                ) : (
                  <em className="missing-field">Adresse in company.ts eintragen</em>
                )}
              </address>
            </div>
          </div>

          <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid #e5e7eb", textAlign: "center" }}>
            <p style={{ color: "#6b7280", fontSize: "0.9375rem" }}>
              <strong>Kostenloser Versand</strong> in die ganze Schweiz & Liechtenstein ·
              <strong>{c.deliveryTimeText || "2–4 Werktage"}</strong> Lieferzeit ·
              <strong>{c.returnPeriodDays} Tage</strong> Widerrufsrecht
            </p>
            {c.uid && (
              <p style={{ marginTop: "0.5rem", color: "#9ca3af", fontSize: "0.8125rem" }}>
                UID: {c.uid} | {c.commercialRegister || "Handelsregistereintrag auf Anfrage"}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
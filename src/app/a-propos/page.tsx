import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Über VELORA",
  description:
    "Lernen Sie VELORA und unsere Auswahl an Fahrrädern, Zubehör und Bekleidung kennen.",
};

const categories = [
  {
    name: "City-E-Bikes",
    title: "Für die Stadt",
    description:
      "Entdecken Sie Modelle für tägliche Wege und urbane Mobilität.",
    href: "/categorie/ville",
  },
  {
    name: "Trekking-E-Bikes",
    title: "Für Alltag und Touren",
    description:
      "Finden Sie E-Bikes für vielseitige Wege und längere Ausfahrten.",
    href: "/categorie/vtc",
  },
  {
    name: "E-Mountainbikes",
    title: "Für Wege abseits der Stadt",
    description:
      "Sehen Sie sich unsere Auswahl für Gelände und anspruchsvollere Strecken an.",
    href: "/categorie/vtt",
  },
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="storefront-eyebrow">DIE MARKE VELORA</p>
          <h1>Das Passende für Ihre nächste Tour.</h1>
          <p>
            VELORA ist Ihr Onlineshop für Fahrräder, Zubehör und
            Fahrradbekleidung. Entdecken Sie passende Produkte für Stadt,
            Tour und Gelände.
          </p>
          <div className="about-actions">
            <Link href="/products" className="storefront-primary-link">
              Sortiment entdecken
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </Link>
            <Link href="/contact" className="storefront-secondary-link">
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
        <div className="about-hero-aside" aria-hidden="true">
          <span>VELORA</span>
          <span>City · Trekking · Mountainbike</span>
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
              Bestellungen an unser Team richten.
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
    </main>
  );
}

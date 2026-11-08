import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* SECTION 1: MISSION & COLONNES */}
      <section className="about-intro-section">
        <div className="about-container">
          <div className="about-grid-3">
            {/* Colonne 1: Notre mission */}
            <div className="about-col">
              <span className="about-subtitle-tag">
                Über uns – Swiss Holz
              </span>
              <h1 className="about-col-title">Unsere Mission</h1>
              <p className="about-text">
                Bei Swiss Holz sind wir davon überzeugt, dass Heizen mit Holz
                wirtschaftlich, komfortabel und umweltfreundlich sein sollte.
                Deshalb wählen wir hochwertige Brennstoffe aus verantwortungsvollen
                Quellen aus, um eine konstante Wärme und optimale Leistung bei
                jeder Nutzung zu gewährleisten.
              </p>
            </div>

            {/* Colonne 2: Expertise */}
            <div className="about-col flex-between">
              <div>
                <h3 className="about-col-h3">
                  Wir stellen unsere Expertise in den Dienst Ihres Komforts.
                  Sparen Sie mit dem, was wir tun.
                </h3>
                <p className="about-text">
                  Mit jahrelanger Erfahrung im Vertrieb von Brennholz
                  unterstützt Swiss Holz Privatpersonen und Unternehmen
                  bei all ihren Heizbedürfnissen.
                </p>
              </div>
              <Link href="/boutique" className="about-link-btn">
                SHOP BESUCHEN
              </Link>
            </div>

            {/* Colonne 3: Sélection de produits */}
            <div className="about-col flex-between">
              <div>
                <h3 className="about-col-h3">
                  Eine verantwortungsvolle und sorgfältig ausgewählte Produktauswahl
                </h3>
                <p className="about-text">
                  Ob Brennholz, Buchenbriketts, Holzpellets,
                  Pressholz oder Kaminöfen – wir bieten sorgfältig ausgewählte
                  Produkte, die sich durch ihre Leistungsfähigkeit und Zuverlässigkeit auszeichnen.
                </p>
              </div>
              <Link href="/boutique" className="about-link-btn">
                SHOP BESUCHEN
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: AVEC SWISS HOLZ, VOUS CHOISISSEZ */}
      <section className="about-feature-section">
        <div className="about-container">
          <div className="about-feature-grid">
            {/* Image d'entrepôt bois */}
            <div className="about-image-wrapper">
              <Image
                src="/img/about.jpeg"
                alt="Holzlagerung Swiss Holz"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="about-img"
                priority
              />
            </div>

            {/* Contenu texte */}
            <div className="about-feature-content">
              <span className="about-subtitle-tag">
                Ihr Spezialist für Holzheizsysteme
              </span>
              <h2 className="about-main-title">
                Mit Swiss Holz entscheiden Sie sich für:
              </h2>

              <p className="about-highlight-text">
                Qualität, Leistung, Nachhaltigkeit und persönlichen Service. Wir
                sind stolz darauf, zu einem natürlicheren, wirtschaftlicheren und
                verantwortungsvolleren Heizsystem beizutragen.
              </p>

              <p className="about-text">
                Qualität steht im Mittelpunkt all unserer Aktivitäten. Wir
                arbeiten mit Partnern zusammen, die sich für eine nachhaltige
                Waldbewirtschaftung einsetzen, und garantieren Brennstoffe mit hohem
                Heizwert, geringer Restfeuchte, Sauberkeit und gleichbleibender
                Qualität.
              </p>

              <p className="about-text">
                Sie bieten eine optimierte und hochwertige Verbrennung. Jedes
                Produkt wird getestet, um zu jeder Jahreszeit ein optimales
                Heizerlebnis zu gewährleisten.
              </p>

              {/* Réseaux sociaux */}
              <div className="about-social-divider">
                <div className="about-social-links">
                 
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
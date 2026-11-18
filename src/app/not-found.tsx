import Link from "next/link";
import { companyConfig } from "@/config/company";

const c = companyConfig;

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-code">404</div>
        <h1>Seite nicht gefunden</h1>
        <p>
          Die gesuchte Seite existiert nicht oder wurde verschoben.
          Vielleicht haben Sie sich vertippt oder der Link ist veraltet.
        </p>

        <div className="not-found-actions">
          <Link href="/" className="btn-primary">
            <i className="fa-solid fa-house" aria-hidden="true" />
            Zur Startseite
          </Link>
          <Link href="/produkte" className="btn-secondary">
            <i className="fa-solid fa-store" aria-hidden="true" />
            Zum Shop
          </Link>
          <Link href="/kategorie" className="btn-secondary">
            <i className="fa-solid fa-layer-group" aria-hidden="true" />
            Kategorien
          </Link>
        </div>

        <div className="not-found-contact">
          <p>Können Sie nicht finden, was Sie suchen?</p>
          <p>
            Kontaktieren Sie uns:
            <a href={`mailto:${c.email}`}>{c.email}</a>
            {" | "}
            <a href={`tel:${c.phoneRaw}`}>{c.phone}</a>
          </p>
        </div>
      </div>
    </main>
  );
}
import type { ReactNode } from "react";

type LegalDocumentProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function LegalDocument({
  title,
  description,
  children,
}: LegalDocumentProps) {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <p className="legal-eyebrow">VELORA · RECHTLICHE INFORMATIONEN</p>
          <h1 className="legal-title">{title}</h1>
          <p className="legal-subtitle">{description}</p>
        </header>

        <aside className="legal-draft-notice" role="note">
          <strong>Entwurf – vor Veröffentlichung vervollständigen</strong>
          <p>
            Angaben in eckigen Klammern müssen mit den tatsächlichen
            Unternehmens- und Geschäftsangaben ersetzt werden. Dieser Text ist
            keine Rechtsberatung.
          </p>
        </aside>

        <article className="legal-content">{children}</article>
        <p className="legal-last-updated">Stand: 8. November 2026</p>
      </div>
    </main>
  );
}

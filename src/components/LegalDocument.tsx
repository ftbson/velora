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

        <article className="legal-content">{children}</article>
        <p className="legal-last-updated">Stand: {new Date().toLocaleDateString("de-CH", { year: "numeric", month: "long", day: "numeric" })}</p>
      </div>
    </main>
  );
}

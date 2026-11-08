import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import TermsContent from "@/components/TermsContent";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen",
  description: "Allgemeine Geschäftsbedingungen für Bestellungen bei VELORA.",
};

export default function TermsPage() {
  return (
    <LegalDocument
      title="Allgemeine Geschäftsbedingungen"
      description="Bedingungen für Bestellungen im VELORA-Onlineshop."
    >
      <TermsContent />
    </LegalDocument>
  );
}

import { Suspense } from "react";
import ShopGrid from "@/components/ShopGrid";

export const metadata = {
  title: "Alle Produkte | VELORA",
  description:
    "Entdecken Sie Fahrräder, Kinderfahrräder, Fahrradzubehör und Radbekleidung.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; search?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const query = resolvedParams.q || resolvedParams.search || "";

  return (
    <main>
      <Suspense fallback={<div className="catalog-loading">Produkte werden geladen...</div>}>
        <ShopGrid initialQuery={query} />
      </Suspense>
    </main>
  );
}

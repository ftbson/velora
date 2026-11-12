import { Suspense } from "react";
import ShopGrid from "@/components/ShopGrid";

export const metadata = {
  title: "Fahrräder und Zubehör | VELORA",
  description:
    "Entdecken Sie E-Bikes, Fahrradzubehör, Radbekleidung und Kinderfahrräder.",
};

export default function BoutiquePage() {
  return (
    <main className="shop-page-wrapper">
      <Suspense fallback={<div className="catalog-loading">Produkte werden geladen...</div>}>
        <ShopGrid />
      </Suspense>
    </main>
  );
}

import CategorySection from "@/components/Categories";
import Link from "next/link";

export const metadata = {
  title: "Produktkategorien | VELORA",
  description:
    "Entdecken Sie E-Bikes, Fahrradzubehör, Radbekleidung und Produkte für Kinder.",
};

export default function CategoriesPage() {
  return (
    <main className="category-index-page">
      <CategorySection />
      <div className="storefront-actions category-index-action">
        <Link href="/products" className="storefront-primary-link">
          Alle Produkte ansehen
          <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
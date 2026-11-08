import CategorySection from "@/components/Categories";
import Link from "next/link";

export const metadata = {
  title: "E-Bike Kategorien | VELORA",
  description: "Finden Sie das passende VELORA E-Bike für Stadt, Trekking oder Gelände.",
};

export default function CategoriesPage() {
  return (
    <main className="category-index-page">
      <CategorySection />
      <div className="storefront-actions category-index-action">
        <Link href="/products" className="storefront-primary-link">
          Alle E-Bikes ansehen
          <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
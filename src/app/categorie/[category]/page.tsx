import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { productsData, type ProductCategory } from "@/data/products";

const categories = {
  ville: { label: "E-Bikes für die Stadt", code: "VILLE" },  
  vtc: { label: "Trekking- und Touren-E-Bikes", code: "VTC" },
  vtt: { label: "E-Mountainbikes", code: "VTT" },
  accessoires: { label: "Fahrradzubehör", code: "ACCESSOIRES" },
  vetements: { label: "Fahrradbekleidung", code: "Kleidung" },
  enfants: { label: "Kinderfahrräder", code: "kinder" },
} as const satisfies Record<string, { label: string; code: ProductCategory }>;

type CategorySlug = keyof typeof categories;

function isCategorySlug(value: string): value is CategorySlug {
  return Object.hasOwn(categories, value);
}

export function generateStaticParams() {
  return Object.keys(categories).map((category) => ({ category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isCategorySlug(category)) notFound();

  const selectedCategory = categories[category];
  const products = productsData.filter(
    (product) => product.category === selectedCategory.code,
  );

  return (
    <main className="catalog-page">
      <header className="catalog-heading">
        <p className="storefront-eyebrow">UNSERE KATEGORIEN</p>
        <h1>{selectedCategory.label}</h1>
        <p>{products.length} Produkte in dieser Kategorie</p>
      </header>
      <div className="storefront-product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="storefront-actions">
        <Link href="/categorie" className="storefront-secondary-link">
          Alle Kategorien
        </Link>
        <Link href="/products" className="storefront-primary-link">
          Gesamtes Sortiment
          <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}

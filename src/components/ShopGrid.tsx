import ProductCard from "@/components/ProductCard";
import { productsData } from "@/data/products";

export default function ShopGrid() {
  return (
    <section className="catalog-page" aria-labelledby="shop-title">
      <header className="catalog-heading">
        <p className="storefront-eyebrow">VELORA BIKE-SHOP</p>
        <h1 id="shop-title">Alle Produkte</h1>
        <p>
          Fahrräder, Zubehör und Bekleidung für Stadt, Tour und Gelände
        </p>
        <p className="catalog-draft-notice">
          Musterartikel sind gekennzeichnet. Bitte Preise, Verfügbarkeit und
          Produktdaten vor der Freigabe bestätigen.
        </p>
      </header>
      <div className="storefront-product-grid">
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

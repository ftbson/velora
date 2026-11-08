import ProductCard from "@/components/ProductCard";
import { productsData } from "@/data/products";

export default function ShopGrid() {
  return (
    <section className="catalog-page" aria-labelledby="shop-title">
      <header className="catalog-heading">
        <p className="storefront-eyebrow">VELORA E-BIKE SHOP</p>
        <h1 id="shop-title">Alle E-Bikes</h1>
        <p>{productsData.length} Modelle für Stadt, Tour und Gelände</p>
      </header>
      <div className="storefront-product-grid">
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

import ProductCard from "@/components/ProductCard";
import { productsData } from "@/data/products";

export default function ShopGrid() {
  return (
    <section
      aria-labelledby="shop-title"
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "50px 20px",
        width: "100%",
      }}
    >
      <h1
        id="shop-title"
        style={{
          fontSize: "28px",
          fontWeight: "800",
          marginBottom: "30px",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        Unsere E-Bikes
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

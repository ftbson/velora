"use client";

import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import CategorySection from "@/components/Categories";
import BestSellers from "@/components/BestSellers";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Poele from "@/components/Poele";
import { productsData } from "@/data/products"; // <--- IMPORTER LES PRODUITS

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main>
      {/* 1. Hero Carousel */}
      <Hero />
      <CategorySection />

      {/* 2. Section des Produits avec la liste transmise aux ProductCards */}
      <section className="products-section" style={{ padding: "50px 20px", maxWidth: "1400px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "30px", textAlign: "center", textTransform: "uppercase" }}>
          Unsere Top E-Bikes
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "25px" }}>
          {productsData.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      <section className="scroll-top-section">
        {/* Bouton Retour en haut fixe */}
        <button
          onClick={scrollToTop}
          className="scroll-top-btn-fixed"
          aria-label="top"
        >
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      </section>
    </main>
  );
}
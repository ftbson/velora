import Hero from "@/components/Hero";
import CategorySection from "@/components/Categories";
import HomeProducts from "@/components/HomeProducts";
import ExperienceSection from "@/components/ExperienceSection";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <CategorySection />
      <HomeProducts />
      <ExperienceSection />
      <a href="#top" className="scroll-top-btn-fixed" aria-label="Zurück nach oben">
          <i className="fa-solid fa-arrow-up"></i>
      </a>
    </main>
  );
}
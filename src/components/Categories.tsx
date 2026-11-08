"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    id: "ville",
    name: "CITY E-BIKES",
    subName: "VILLE",
    link: "/category/city-ebikes",
    image: "/img/city.jpg", // Remplace par tes images
    buttonText: "Entdecken",
  },
  {
    id: "vtc",
    name: "TREKKING E-BIKES",
    subName: "VTC",
    link: "/category/trekking-ebikes",
    image: "/img/TREKKING.jpg",
    buttonText: "Entdecken",
  },
  {
    id: "vtt",
    name: "E-MOUNTAINBIKES",
    subName: "VTT",
    link: "/category/mtb-ebikes",
    image: "/img/E-MOUNTAINBIKES.jpg",
    buttonText: "Entdecken",
  },
];

export default function CategorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animation Reveal progressive au défilement
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll(".velora-reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="velora-categories-section" ref={sectionRef}>
      <div className="velora-categories-container">
        {/* En-tête centré */}
        <div className="velora-categories-header velora-reveal">
          <span className="velora-categories-subtitle">UNSERE KATEGORIEN</span>
          <h2 className="velora-categories-title">
            KATEGORIEN FÜR JEDEN FAHRSTIL
          </h2>
        </div>

        {/* Grille des 3 catégories (Style 2ème image) */}
        <div className="velora-categories-grid">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              className={`velora-category-card velora-reveal delay-${index + 1}`}
            >
              <div className="velora-category-image-wrapper">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="velora-category-img"
                />
                <div className="velora-category-overlay"></div>
              </div>

              {/* Textes et Bouton centrés sur la carte */}
              <div className="velora-category-content">
                <span className="velora-category-badge">{cat.subName}</span>
                <h3 className="velora-category-name">{cat.name}</h3>
                <Link href={cat.link} className="velora-category-btn">
                  {cat.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
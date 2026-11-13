"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    id: "stadt",
    name: "City-E-Bikes",
    subName: "STADT",
    link: "/kategorie/stadt",
    image: "/img/city.jpg",
    buttonText: "Entdecken",
  },
  {
    id: "trekking",
    name: "Trekking-E-Bikes",
    subName: "TOUR",
    link: "/kategorie/trekking",
    image: "/img/TREKKING.jpg",
    buttonText: "Entdecken",
  },
  {
    id: "mountainbike",
    name: "E-Mountainbikes",
    subName: "GELÄNDE",
    link: "/kategorie/mountainbike",
    image: "/img/E-MOUNTAINBIKES.jpg",
    buttonText: "Entdecken",
  },
  {
    id: "zubehoer",
    name: "Fahrradzubehör",
    subName: "ZUBEHÖR",
    link: "/kategorie/zubehoer",
    image: "/img/accessoires.jpg",
    buttonText: "Entdecken",
  },
  {
    id: "bekleidung",
    name: "Fahrradbekleidung",
    subName: "BEKLEIDUNG",
    link: "/kategorie/bekleidung",
    image: "/img/vetements.jpg",
    buttonText: "Entdecken",
  },
  {
    id: "kinder",
    name: "Kinderfahrräder",
    subName: "FÜR KINDER",
    link: "/kategorie/kinder",
    image: "/img/enfants.jpg",
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
      { threshold: 0.15 },
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

        {/* Kategorienübersicht */}
        <div className="velora-categories-grid">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              className={`velora-category-card velora-reveal delay-${index + 1}`}
            >
              <div className="velora-category-image-wrapper">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="velora-category-img"
                  />
                ) : (
                  <div
                    className={`velora-category-placeholder category-${cat.id}`}
                    aria-hidden="true"
                  />
                )}
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

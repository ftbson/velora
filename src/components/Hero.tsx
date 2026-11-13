"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const heroSlides = [
  {
    id: 1,
    title: "Fahrräder für jeden Weg",
    subtitle: "Entdecken Sie City-, Trekking- und Mountainbike-Modelle für Alltag, Tour und Gelände.",
    buttonText: "Alle Produkte entdecken",
    buttonLink: "/products",
    image: "/img/hero1.jpg",
    tag: "VELORA"
  },
  {
    id: 2,
    title: "Kostenloser Versand",
    subtitle: "Ihre Bestellung wird ohne zusätzliche Versandkosten geliefert.",
    buttonText: "Sortiment ansehen",
    buttonLink: "/products",
    image: "/img/hero2.jpg",
    tag: "IHR PLUS BEI VELORA"
  },
  {
    id: 3,
    title: "Gut unterwegs mit der ganzen Familie",
    subtitle: "Entdecken Sie passende Kinderfahrräder für Schule, Alltag und gemeinsame Ausflüge.",
    buttonText: "Kinderfahrräder ansehen",
    buttonLink: "/kategorie/kinder",
    image: "/img/hero3.jpg",
    tag: "FÜR JUNGE RADFAHRER"
  },
  {
    id: 4,
    title: "Alles für Ihre nächste Tour",
    subtitle: "Praktisches Zubehör und funktionale Bekleidung für Ihre Zeit auf dem Rad.",
    buttonText: "Zubehör entdecken",
    buttonLink: "/kategorie/zubehoer",
    image: "/img/hero4.jpg",
    tag: "ZUBEHÖR & BEKLEIDUNG"
  }
];
export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Rotation automatique toutes les 6 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="velora-hero">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`velora-hero-slide ${index === currentSlide ? "active" : ""}`}
        >
          {/* Arrière-plan avec Image Next.js */}
          <div className="velora-hero-bg">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="velora-hero-img"
            />
            <div className="velora-hero-overlay"></div>
          </div>

          {/* Contenu textuel avec animations */}
          <div className="velora-hero-container">
            <div className="velora-hero-content">
              <span className="velora-hero-tag">{slide.tag}</span>
              <h1 className="velora-hero-title">{slide.title}</h1>
              <p className="velora-hero-subtitle">{slide.subtitle}</p>
              <div className="velora-hero-actions">
                <Link href={slide.buttonLink} className="velora-hero-btn">
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Karussell-Steuerung */}
      <div className="velora-hero-controls">
            <button className="velora-hero-arrow" onClick={prevSlide} aria-label="Vorherige Folie">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="velora-hero-dots">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`velora-hero-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Zu Folie ${index + 1}`}
            ></button>
          ))}
        </div>
        <button className="velora-hero-arrow" onClick={nextSlide} aria-label="Nächste Folie">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}
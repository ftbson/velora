"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Données des slides avec les chemins d'images corrects
const heroSlides = [
  {
    id: 1,
    title: "VELORA E-BIKE PRIME",
    subtitle: "Erleben Sie die nächste Generation elektrischer Mobilität in den Bergen. Kraftvoll, elegant und zuverlässig.",
    buttonText: "E-Bikes entdecken",
    buttonLink: "/shop",
    image: "/img/hero1.jpg", 
    tag: "Schweizer Qualität"
  },
  {
    id: 2,
    title: "20 % RABATT AUF ZUBEHÖR",
    subtitle: "Kaufen Sie ein E-Bike und erhalten Sie 20% Rabatt auf berechtigtes Zubehör. Gilt automatisch im Warenkorb!",
    buttonText: "Zubehör ansehen",
    buttonLink: "/category/accessories",
    image: "/img/hero2.jpg",
    tag: "Sonderaktion"
  },
  {
    id: 3,
    title: "KÜSTEN- & STRASSEN-FAHRSPASS",
    subtitle: "Genießen Sie grenzenlose Freiheit an der Küste mit unseren komfortablen und stylischen Modellen für jeden Tag.",
    buttonText: "Modelle ansehen",
    buttonLink: "/shop",
    image: "/img/hero3.jpg",
    tag: "Lifestyle"
  },
  {
    id: 4,
    title: "STADT & QUARTIER MOBILITÄT",
    subtitle: "Perfekt für den Alltag in der Nachbarschaft: Entdecken Sie unsere wendigen und kraftvollen Alltags-E-Bikes.",
    buttonText: "Jetzt entdecken",
    buttonLink: "/offers",
    image: "/img/hero4.jpg",
    tag: "Neuheit"
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

      {/* Contrôles du Carrousel (Flèches et Points) */}
      <div className="velora-hero-controls">
        <button className="velora-hero-arrow" onClick={prevSlide} aria-label="Précédent">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="velora-hero-dots">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`velora-hero-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Aller au slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <button className="velora-hero-arrow" onClick={nextSlide} aria-label="Suivant">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}
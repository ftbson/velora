"use client";

import { useEffect, useState, useRef } from "react";

interface Feature {
  icon: string;
  title: string; 
  description: string;
  active?: boolean;
}

const features: Feature[] = [
  {
    icon: "fa-solid fa-truck-fast",
    title: "Schnelle Lieferung",
    description: "Lieferung nach Hause innerhalb von 24 bis 72 Stunden in der ganzen Schweiz.",
    active: true,
  },
  {
    icon: "fa-solid fa-award",
    title: "Höchste Qualität",
    description: "Schweizer Holz, ofengetrocknet und zertifiziert.",
  },
  {
    icon: "fa-solid fa-shield-halved",
    title: "Sichere Zahlung",
    description: "TWINT, Kreditkarte oder Kauf auf Rechnung – vollständig verschlüsselt.",
  },
  {
    icon: "fa-solid fa-headset",
    title: "Kundenservice",
    description: "Persönliche Beratung steht Ihnen von Montag bis Samstag zur Verfügung.",
  },
];

interface Stat {
  id: string;
  target: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { id: "clients", target: 15000, suffix: "+", label: "ZUFRIEDENE KUNDEN" },
  { id: "steres", target: 25000, suffix: "", label: "GELIEFERTE STER" },
  { id: "experience", target: 12, suffix: "", label: "JAHRE ERFAHRUNG" },
  { id: "cantons", target: 26, suffix: "", label: "BELIEFERTE KANTONE" },
];

export default function WhyUs() {
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    clients: 0,
    steres: 0,
    experience: 0,
    cantons: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateStats();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateStats = () => {
    const duration = 2000;
    const steps = 50;
    const intervalTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounts({
        clients: Math.floor(progress * 15000),
        steres: Math.floor(progress * 25000),
        experience: Math.floor(progress * 12),
        cantons: Math.floor(progress * 26),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts({
          clients: 15000,
          steres: 25000,
          experience: 12,
          cantons: 26,
        });
      }
    }, intervalTime);
  };

  return (
    <section className="whyus-section" ref={sectionRef}>
      <div className="whyus-container">
        {/* Header */}
        <div className="whyus-header">
          <h2 className="whyus-title">Warum SwissHolz</h2>
          <p className="whyus-subtitle">
            Vier Versprechen, auf die Sie sich verlassen können.
          </p>
          <div className="whyus-line"></div>
        </div>

        {/* Vorteils-Raster */}
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div
                className={`feature-icon-wrap ${
                  feature.active ? "active" : ""
                }`}
              >
                <i className={feature.icon}></i>
              </div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-desc">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Dynamischer Statistik-Banner */}
        <div className="stats-banner">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-item">
              <div className="stat-number">
                {counts[stat.id].toLocaleString("de-CH")}
                {stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
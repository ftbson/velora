"use client";

import React from "react";
import Link from "next/link";

export default function ExperienceSection() {
  return (
    <section className="velora-experience-section">
      {/* Vidéo en arrière-plan en boucle et mutée */}
      <div className="velora-video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="velora-bg-video"
        >
          <source src="/img/experience-cycling-medley-rose-bikes-best-of-querformat_final.mp4" type="video/mp4" />
          Ihr Browser unterstützt keine Videos.
        </video>
        <div className="velora-video-overlay"></div>
      </div>

      {/* Contenu textuel superposé */}
      <div className="velora-experience-content">
        <span className="velora-experience-badge">FÜR JEDEN FAHRSTIL</span>
        <h2 className="velora-experience-title">
          ERLEBEN SIE DIE FREIHEIT AUF ZWEI RÄDERN
        </h2>
        <p className="velora-experience-subtitle">
          Vom Stadtverkehr bis zu anspruchsvollen Trails: Entdecken Sie Fahrräder, Zubehör und Bekleidung für Ihre nächste Tour.
        </p>
        <div className="velora-experience-actions">
          <Link href="/products" className="velora-btn-primary">
            Alle Produkte entdecken
          </Link>
          <Link href="/a-propos" className="velora-btn-secondary">
            Über VELORA
          </Link>
        </div>
      </div>
    </section>
  );
}
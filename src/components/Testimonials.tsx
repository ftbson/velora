"use client";

import { useState } from "react";

interface Testimonial {
  id: number;
  rating: number;
  quote: string;
  initials: string;
  name: string;
  city: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    quote:
      "« Die besten Briketts, die ich je hatte. Lange Brenndauer und sehr wenig Asche. »",
    initials: "T",
    name: "Thomas Schweizer",
    city: "Lugano",
  },
  {
    id: 2,
    rating: 5,
    quote:
      "« Trockenes Holz, pünktliche Lieferung und einwandfreier Service. Ich bestelle jedes Jahr. »",
    initials: "K",
    name: "Karin Keller",
    city: "Zürich",
  },
  {
    id: 3,
    rating: 5,
    quote:
      "« Die Pellets verbrennen sehr sauber. Das Preis-Leistungs-Verhältnis ist hervorragend. »",
    initials: "J",
    name: "Jean-Pierre Blanc",
    city: "Lausanne",
  },
  {
    id: 4,
    rating: 5,
    quote:
      "« Die telefonische Beratung war ausgezeichnet. Mein neuer Kaminofen wurde in einwandfreiem Zustand geliefert. »",
    initials: "S",
    name: "Stefan Huber",
    city: "Bern",
  },
  {
    id: 5,
    rating: 5,
    quote:
      "« Sehr schnelle Lieferung und erstklassige Holzqualität. Perfekt für unseren Kamin im Winter! »",
    initials: "E",
    name: "Elena Rossi",
    city: "Bellinzona",
  },
  {
    id: 6,
    rating: 5,
    quote:
      "« Absolut zuverlässiger Händler. Die Verpackung war sauber und das Buchenholz brennt hervorragend. »",
    initials: "M",
    name: "Matthias Gerber",
    city: "Basel",
  },
  {
    id: 7,
    rating: 5,
    quote:
      "« Hervorragender Kundenservice und faire Preise. Ich bin seit zwei Jahren treuer Kunde. »",
    initials: "C",
    name: "Cédric Favrod",
    city: "Genf",
  },
];

export default function Testimonials() {
  const [activeDot, setActiveDot] = useState(2); // 3. Dot standardmässig aktiv

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        {/* Zentrierter Titel */}
        <div className="testimonials-header">
          <h2 className="testimonials-title">Das sagen unsere Kunden</h2>
        </div>

        {/* Karten-Raster */}
        <div className="testimonials-grid">
          {testimonials.slice(0, 3).map((item) => (
            <div key={item.id} className="testimonial-card">
              {/* Sterne-Bewertung */}
              <div className="testimonial-stars">
                {[...Array(item.rating)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star"></i>
                ))}
              </div>

              {/* Kundenbewertung Text */}
              <p className="testimonial-quote">{item.quote}</p>

              {/* Autor */}
              <div className="testimonial-author">
                <div className="author-avatar">{item.initials}</div>
                <div className="author-info">
                  <h4 className="author-name">{item.name}</h4>
                  <span className="author-city">{item.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Zentrierte Navigation (Dots) */}
        <div className="testimonials-pagination">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              className={`pagination-dot ${
                activeDot === index ? "active" : ""
              }`}
              onClick={() => setActiveDot(index)}
              aria-label={`Zu Slide ${index + 1} wechseln`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
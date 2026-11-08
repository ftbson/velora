"use client";

import { useState } from "react";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const faqs = [
    {
      question: "Welche Holzarten bietet Swiss Holz an?",
      answer:
        "Wir bieten hauptsächlich Harthölzer mit hohem Heizwert an: Eiche, Buche, Hainbuche und Esche. Diese Holzarten brennen lange und gleichmässig und eignen sich ideal für Kaminöfen, Cheminées und Kamineinsätze.",
    },
    {
      question: "Ist das Holz trocken und sofort benutzbar?",
      answer:
        "Ja, unser gesamtes Brennholz ist kammergetrocknet (Restfeuchte unter 20%) und direkt nach der Lieferung einsatzbereit für eine optimale, raucharme Verbrennung.",
    },
    {
      question: "Welche Scheitlängen sind verfügbar?",
      answer:
        "Unsere Holzscheite sind standardmässig auf 25 cm oder 33 cm zugeschnitten, was für die meisten modernen Kaminöfen und Cheminées ideal ist.",
    },
    {
      question: "Bieten Sie eine Lieferung nach Hause an?",
      answer:
        "Absolut. Wir liefern Ihre Holzpaletten direkt zu Ihnen nach Hause und stellen sie mit einem Hubwagen möglichst nahe an Ihrem Lagerplatz ab.",
    },
    {
      question: "Wie viel Holz sollte ich bestellen?",
      answer:
        "Für gelegentliche Nutzung reicht eine Halbpalette meist aus. Wenn Sie den ganzen Winter über primär mit Holz heizen, empfehlen wir je nach Haushaltsgrösse 2 bis 3 Ganze Paletten.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });

      if (!response.ok) {
        throw new Error("Kontaktanfrage konnte nicht gesendet werden");
      }

      form.reset();
      setFormMessage("Vielen Dank. Ihre Nachricht wurde gesendet.");
    } catch {
      setFormMessage(
        "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-grid">
          {/* SPALTE LINKS: FAQ */}
          <div className="faq-column">
            <span className="section-subtitle">INFORMATIONEN & FRAGEN</span>
            <h2 className="section-title">HÄUFIG GESTELLTE FRAGEN</h2>

            <div className="faq-accordion">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${openFaq === index ? "active" : ""}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                  >
                    {faq.question}
                    <i
                      className={`fa-solid fa-chevron-${openFaq === index ? "up" : "down"}`}
                    ></i>
                  </button>
                  <div
                    className="faq-answer-wrapper"
                    style={{
                      maxHeight: openFaq === index ? "200px" : "0",
                      opacity: openFaq === index ? 1 : 0,
                    }}
                  >
                    <p className="faq-answer">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TRENNLINIE */}
          <div className="vertical-divider"></div>

          {/* SPALTE RECHTS: FORMULAR */}
          <div className="form-column">
            <span className="section-subtitle">ÜBER UNS</span>
            <h2 className="section-title">
              Zögern Sie nicht, uns bei Fragen zu kontaktieren.
            </h2>

            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Vollständiges Feld mit abgerundetem Rand */}
              <input
                type="text"
                className="input-full-bordered"
                placeholder=""
              />

              {/* Grid mit 2 Spalten für Unterzeilen-Eingaben */}
              <div className="input-grid">
                <input
                  type="text"
                  className="input-underline"
                  placeholder="Ihr Name"
                  name="name"
                  required
                />
                <input
                  type="email"
                  className="input-underline"
                  placeholder="Ihre E-Mail-Adresse"
                  name="email"
                  required
                />
                <input
                  type="tel"
                  className="input-underline"
                  placeholder="Telefonnummer"
                  name="phone"
                />
                <input
                  type="text"
                  className="input-underline"
                  placeholder="Betreff"
                  name="subject"
                />
              </div>

              {/* Textbereich mit Unterzeile */}
              <textarea
                className="input-underline textarea"
                placeholder="Ihre Nachricht"
                name="message"
                rows={3}
                required
              ></textarea>

              <button
                type="submit"
                className="btn-submit-contact"
                disabled={isSubmitting}
              >
                {isSubmitting ? "WIRD GESENDET..." : "FRAGE STELLEN"}
              </button>
              {formMessage && <p role="status">{formMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

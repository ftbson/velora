"use client";

import { useState } from "react";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const faqs = [
    {
      question: "Welches E-Bike passt zu meinem Alltag?",
      answer:
        "Für den täglichen Stadtverkehr empfehlen wir ein VILLE-Modell. Für längere Touren ist ein VTC ideal, während ein VTT für anspruchsvolle Trails ausgelegt ist.",
    },
    {
      question: "Wie weit kann ich mit einer Akkuladung fahren?",
      answer:
        "Die Reichweite hängt von Akku, Gelände, Unterstützungsstufe und Fahrergewicht ab. Die technischen Angaben zur Reichweite finden Sie auf der jeweiligen Produktseite.",
    },
    {
      question: "Kann ich ein E-Bike zurückgeben oder warten lassen?",
      answer:
        "Unser Team hilft Ihnen gern mit Informationen zu Service, Garantie und Rückgabe. Schreiben Sie uns über das Kontaktformular und nennen Sie Ihr Modell.",
    },
    {
      question: "Wie wird meine Bestellung bezahlt?",
      answer:
        "Nach dem Absenden Ihrer Bestellung erhalten Sie die Bankverbindung und den Gesamtbetrag für die Überweisung direkt im Checkout.",
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
    <main className="contact-section">
      <div className="contact-container">
        <header className="contact-heading">
          <p className="storefront-eyebrow">VELORA SERVICE</p>
          <h1>Wir sind für Sie da</h1>
          <p>Fragen zu unseren E-Bikes, einer Bestellung oder zum Service? Schreiben Sie uns.</p>
        </header>
        <div className="contact-grid">
          {/* SPALTE LINKS: FAQ */}
          <div className="faq-column">
            <span className="section-subtitle">HILFE & INFORMATIONEN</span>
            <h2 className="section-title">Häufig gestellte Fragen</h2>

            <div className="faq-accordion">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${openFaq === index ? "active" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaq === index}
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
            <span className="section-subtitle">KONTAKTIEREN SIE UNS</span>
            <h2 className="section-title">
              Wie können wir Ihnen helfen?
            </h2>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="input-grid">
                <label>
                  Ihr Name *
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label>
                  Ihre E-Mail-Adresse *
                  <input type="email" name="email" autoComplete="email" required />
                </label>
                <label>
                  Telefonnummer
                  <input type="tel" name="phone" autoComplete="tel" />
                </label>
                <label>
                  Betreff
                  <input type="text" name="subject" />
                </label>
              </div>

              <label className="contact-message-label">
                Ihre Nachricht *
                <textarea name="message" rows={5} required />
              </label>

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
    </main>
  );
}

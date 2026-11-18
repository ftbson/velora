"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Fehler beim Senden");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
    }
  };

  return (
    <>
      {status === "success" && (
        <div className="contact-success" role="status">
          <i className="fa-solid fa-circle-check"></i>
          <h3>Vielen Dank!</h3>
          <p>Ihre Nachricht wurde gesendet. Wir melden uns so schnell wie möglich bei Ihnen.</p>
        </div>
      )}

      {status === "error" && (
        <div className="contact-error" role="alert">
          <i className="fa-solid fa-circle-exclamation"></i>
          <p>{errorMessage || "Fehler beim Senden. Bitte versuchen Sie es später erneut."}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Max Mustermann"
              disabled={status === "submitting"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-Mail *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="max@example.ch"
              disabled={status === "submitting"}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Telefon (optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+41 79 123 45 67"
              disabled={status === "submitting"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Betreff *</label>
            <select
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              disabled={status === "submitting"}
            >
              <option value="">Bitte wählen</option>
              <option value="product">Produktfrage / Beratung</option>
              <option value="order">Bestellung / Lieferung</option>
              <option value="return">Rückgabe / Garantie</option>
              <option value="technical">Technisches Problem</option>
              <option value="other">Sonstiges</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Nachricht *</label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Ihre Nachricht an uns..."
            disabled={status === "submitting"}
          />
        </div>

        <button
          type="submit"
          className="btn-submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
              Wird gesendet...
            </>
          ) : (
            <>
              <i className="fa-solid fa-paper-plane" aria-hidden="true" />
              Nachricht senden
            </>
          )}
        </button>
      </form>
    </>
  );
}
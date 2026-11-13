"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getProductCategoryName } from "@/data/products";
import { companyConfig } from "@/config/company";
import StripeCheckout from "@/components/StripeCheckout";

interface BankDetails {
  beneficiary: string;
  iban: string;
  bic: string;
  address: string | null;
}

const c = companyConfig;

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } =
    useCart();

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [step, setStep] = useState<"form" | "payment" | "bank">("form");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    beneficiary: "",
    iban: "",
    bic: "",
    address: null,
  });

  // États pour la soumission backend
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [finalTotal, setFinalTotal] = useState<number>(0);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [emailNotificationSent, setEmailNotificationSent] = useState(true);

  // État du formulaire d'informations client
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "Schweiz",
    streetAddress: "",
    postalCode: "",
    city: "",
    whatsapp: "",
    email: "",
  });

  const shippingCost = 0;
  const grandTotal = subtotal + shippingCost;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const bankResponse = await fetch("/api/bank-details");
      const bankData = await bankResponse.json();
      if (!bankResponse.ok) {
        throw new Error(bankData.error || "Bankverbindung konnte nicht geladen werden.");
      }
      if (!bankData.bankDetails) {
        setErrorMessage(
          "Die Bankverbindung ist noch nicht eingerichtet. Bitte kontaktieren Sie uns.",
        );
        return;
      }
      setBankDetails(bankData.bankDetails);

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: formData,
          items: cart.map(({ id, quantity }) => ({ id, quantity })),
        }),
      });
      const orderResult: unknown = await response.json();

      if (
        !response.ok ||
        typeof orderResult !== "object" ||
        orderResult === null ||
        !("orderId" in orderResult) ||
        typeof orderResult.orderId !== "string" ||
        !("grandTotal" in orderResult) ||
        typeof orderResult.grandTotal !== "number" ||
        !("emailNotificationSent" in orderResult) ||
        typeof orderResult.emailNotificationSent !== "boolean"
      ) {
        const message =
          typeof orderResult === "object" &&
          orderResult !== null &&
          "error" in orderResult &&
          typeof orderResult.error === "string"
            ? orderResult.error
            : "Fehler beim Speichern der Bestellung";
        throw new Error(message);
      }

      setFinalTotal(orderResult.grandTotal);
      setOrderId(orderResult.orderId);
      setEmailNotificationSent(orderResult.emailNotificationSent);
      clearCart();
      setStep("payment"); // Go to payment method selection
    } catch (error) {
      console.error("Erreur commande:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStripeSuccess = () => {
    // Stripe redirects to success URL, this is for reference
    setShowCheckoutModal(false);
    setStep("form");
    setOrderId(null);
  };

  const handleStripeCancel = () => {
    setStep("payment");
  };

  const handleStripeError = (error: string) => {
    setErrorMessage(error);
    setStep("payment");
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCloseModal = () => {
    setShowCheckoutModal(false);
    setStep("form");
    setErrorMessage(null);
    setOrderId(null);
  };

  return (
    <>
      <main className="cart-page">
        <div className="cart-container">
          <h1 className="cart-page-title">Mein Warenkorb</h1>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <i className="fa-solid fa-basket-shopping empty-icon"></i>
              <h2>Ihr Warenkorb ist leer</h2>
              <p>Entdecken Sie unsere Produkte und treffen Sie Ihre Auswahl.</p>
              <Link href="/produkte" className="btn-primary-cart">
                Zum Shop
              </Link>
            </div>
          ) : (
            <div className="cart-layout">
              {/* Liste des articles */}
              <div className="cart-items-section">
                <div className="cart-items-header">
                  <span>Produkt</span>
                  <span>Preis</span>
                  <span>Menge</span>
                  <span>Gesamt</span>
                  <span></span>
                </div>

                {cart.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    {/* Produit */}
                    <div className="cart-item-info">
                      <div className="cart-item-image">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="80px"
                          />
                        ) : (
                          <span className="cart-image-placeholder" aria-hidden="true">
                            <i className="fa-solid fa-bicycle" />
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="cart-item-category">
                          {getProductCategoryName(item.category)}
                        </p>
                        <h4 className="cart-item-title">{item.title}</h4>
                      </div>
                    </div>

                    {/* Prix Unitaire */}
                    <div className="cart-item-price">
                      CHF {item.price.toFixed(2).replace(".", ",")}
                    </div>

                    {/* Quantité */}
                    <div className="cart-item-quantity">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* Total Unitaire */}
                    <div className="cart-item-total">
                      CHF {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                    </div>

                    {/* Supprimer */}
                    <button
                      className="btn-remove"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Löschen"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))}

                <div className="cart-actions-bottom">
                  <button className="btn-clear" onClick={clearCart}>
                    Warenkorb leeren
                  </button>
                  <Link href="/produkte" className="btn-continue">
                    <i className="fa-solid fa-arrow-left"></i> Weiter einkaufen
                  </Link>
                </div>
              </div>

              {/* Récapitulatif Commande */}
              <div className="cart-summary-card">
                <h3>Bestellübersicht</h3>

                <div className="summary-row">
                  <span>Zwischensumme</span>
                  <span>CHF {subtotal.toFixed(2).replace(".", ",")}</span>
                </div>

                <div className="summary-row">
                  <span>Lieferung</span>
                  <span>Kostenlos</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row total">
                  <span>Gesamtsumme (inkl. MwSt.)</span>
                  <span>CHF {grandTotal.toFixed(2).replace(".", ",")}</span>
                </div>

                <button
                  className="btn-checkout"
                  onClick={() => {
                    setStep("form");
                    setShowCheckoutModal(true);
                  }}
                >
                  Zur Kasse
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* MODALE DE COMMANDE */}
      {showCheckoutModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="bank-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton Fermer */}
            <button
              className="modal-close-btn"
              onClick={handleCloseModal}
              aria-label="Schließen"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            {step === "form" ? (
              /* ÉTAPE 1 : FORMULAIRE DE LIVRAISON */
              <div className="checkout-form-container">
                <div className="modal-header">
                  <div className="icon-wrapper">
                    <i className="fa-solid fa-truck-fast"></i>
                  </div>
                  <h2>Lieferadresse & Kontakt</h2>
                  <p>
                    Bitte geben Sie Ihre Daten ein, um zur Zahlungsauswahl zu gelangen.
                  </p>
                </div>

                {errorMessage && (
                  <div className="error-alert" style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="checkout-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">Vorname *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Max"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Nachname *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Mustermann"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="country">Land *</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Schweiz">Schweiz</option>
                      <option value="Liechtenstein">Liechtenstein</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="streetAddress">Lieferadresse (Straße & Nr.) *</label>
                    <input
                      type="text"
                      id="streetAddress"
                      name="streetAddress"
                      required
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      placeholder="Musterstraße 12"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="postalCode">Postleitzahl *</label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        autoComplete="postal-code"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="8001"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="city">Ort *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        autoComplete="address-level2"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Zürich"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="whatsapp">WhatsApp-Nummer *</label>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder="+41 79 123 45 67"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">E-Mail-Adresse *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="max@example.ch"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-modal-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Wird gesendet..." : "Weiter zur Zahlung"}
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </form>
              </div>
            ) : step === "payment" ? (
              /* ÉTAPE 2 : CHOIX DU MOYEN DE PAIEMENT */
              <div className="payment-method-container">
                <div className="modal-header">
                  <div className="icon-wrapper">
                    <i className="fa-solid fa-credit-card"></i>
                  </div>
                  <h2>Zahlungsart wählen</h2>
                  <p>
                    Vielen Dank, <strong>{formData.firstName}</strong>. Wählen Sie Ihre bevorzugte Zahlungsart für
                    <strong>CHF {finalTotal.toFixed(2).replace(".", ",")}</strong>:
                  </p>
                  {orderId && <p className="checkout-order-reference">Bestellnummer: {orderId}</p>}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <button
                    type="button"
                    onClick={() => setStep("bank")}
                    className="payment-method-btn"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1.25rem 1.5rem",
                      background: "#fff",
                      border: "2px solid #d1d5db",
                      borderRadius: "12px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "border-color 0.2s, box-shadow 0.2s"
                    }}
                  >
                    <div style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "10px",
                      background: "#fef2f2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <i className="fa-solid fa-building-columns" style={{ fontSize: "1.5rem", color: "#D52B1E" }}></i>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "1rem", color: "#111827" }}>Banküberweisung</div>
                      <div style={{ fontSize: "0.8125rem", color: "#6b7280" }}>
                        Überweisen Sie den Betrag innerhalb von {c.paymentDeadlineDays} Tagen. Bestellung wird nach Geldeingang versandt.
                      </div>
                    </div>
                    <i className="fa-solid fa-chevron-right" style={{ marginLeft: "auto", color: "#9ca3af" }}></i>
                  </button>

                  <StripeCheckout
                    orderId={orderId!}
                    onSuccess={handleStripeSuccess}
                    onCancel={handleStripeCancel}
                    onError={handleStripeError}
                  />
                </div>

                <div className="modal-footer">
                  <button
                    className="btn-modal-close"
                    onClick={() => setStep("form")}
                  >
                    ← Zurück zu Lieferadresse
                  </button>
                </div>
              </div>
            ) : (
              /* ÉTAPE 3 : COORDONNÉES BANCAIRES */
              <div className="bank-details-container">
                <div className="modal-header">
                  <div className="icon-wrapper">
                    <i className="fa-solid fa-building-columns"></i>
                  </div>
                  <h2>Bankverbindung für die Überweisung</h2>
                  <p>
                    Vielen Dank, <strong>{formData.firstName}</strong>. Bitte überweisen Sie den Gesamtbetrag von{" "}
                    <strong>CHF {finalTotal.toFixed(2).replace(".", ",")}</strong> an
                    die folgende Bankverbindung:
                  </p>
                  {orderId && <p className="checkout-order-reference">Bestellnummer: {orderId}</p>}
                  {!emailNotificationSent && (
                    <p className="checkout-notification-warning" role="status">
                      Ihre Bestellung ist gespeichert. Die automatische Benachrichtigung ist fehlgeschlagen; bitte kontaktieren Sie uns mit Ihrer Bestellnummer.
                    </p>
                  )}
                </div>

                <div className="bank-details-list">
                  <div className="bank-detail-item">
                    <span className="detail-label">Kontoinhaber:</span>
                    <div className="detail-value-wrap">
                      <strong className="detail-value">{bankDetails.beneficiary}</strong>
                      <button
                        type="button"
                        aria-label="Kontoinhaber kopieren"
                        className="copy-btn"
                        onClick={() => handleCopy(bankDetails.beneficiary, "beneficiary")}
                      >
                        <i className={copiedField === "beneficiary" ? "fa-solid fa-check" : "fa-regular fa-copy"}></i>
                      </button>
                    </div>
                  </div>

                  <div className="bank-detail-item">
                    <span className="detail-label">IBAN:</span>
                    <div className="detail-value-wrap">
                      <strong className="detail-value highlight">{bankDetails.iban}</strong>
                      <button
                        type="button"
                        aria-label="IBAN kopieren"
                        className="copy-btn"
                        onClick={() => handleCopy(bankDetails.iban, "iban")}
                      >
                        <i className={copiedField === "iban" ? "fa-solid fa-check" : "fa-regular fa-copy"}></i>
                      </button>
                    </div>
                  </div>

                  <div className="bank-detail-item">
                    <span className="detail-label">BIC / SWIFT:</span>
                    <div className="detail-value-wrap">
                      <strong className="detail-value">{bankDetails.bic}</strong>
                      <button
                        type="button"
                        aria-label="BIC kopieren"
                        className="copy-btn"
                        onClick={() => handleCopy(bankDetails.bic, "bic")}
                      >
                        <i className={copiedField === "bic" ? "fa-solid fa-check" : "fa-regular fa-copy"}></i>
                      </button>
                    </div>
                  </div>

                  {bankDetails.address && (
                    <div className="bank-detail-item">
                      <span className="detail-label">Adresse:</span>
                      <div className="detail-value-wrap">
                        <span className="detail-value">{bankDetails.address}</span>
                        <button
                          type="button"
                          aria-label="Adresse kopieren"
                          className="copy-btn"
                          onClick={() => handleCopy(bankDetails.address ?? "", "address")}
                        >
                          <i className={copiedField === "address" ? "fa-solid fa-check" : "fa-regular fa-copy"}></i>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="modal-info-box">
                  <i className="fa-solid fa-circle-info"></i>
                  <p>
                    Geben Sie bei der Überweisung bitte Ihre Bestellnummer (<strong>{orderId}</strong>) als Verwendungszweck an.
                    Zahlungsfrist: <strong>{c.paymentDeadlineDays} Tage</strong> nach Bestellbestätigung.
                  </p>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn-modal-close"
                    onClick={() => setStep("payment")}
                  >
                    ← Zurück zur Zahlungsauswahl
                  </button>
                  <button
                    className="btn-modal-close"
                    onClick={handleCloseModal}
                    style={{ background: "#111827", color: "#fff" }}
                  >
                    Verstanden & Schließen
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
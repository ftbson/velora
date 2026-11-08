"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface BankDetails {
  beneficiary: string;
  iban: string;
  bic: string;
  address: string | null;
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } =
    useCart();

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [step, setStep] = useState<"form" | "bank">("form");
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

  // Nouvel état pour conserver le montant total de la commande après vidage du panier
  const [finalTotal, setFinalTotal] = useState<number>(0);

  // État du formulaire d'informations client
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "Schweiz",
    streetAddress: "",
    whatsapp: "",
    email: "",
  });

  const shippingCost = subtotal > 150 || cart.length === 0 ? 0 : 15.0;
  const grandTotal = subtotal + shippingCost;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // SOUMISSION VERS LE BACKEND / TURSO
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Sauvegarder le montant total avant de vider le panier
    const orderTotal = grandTotal;

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
          subtotal,
          shippingCost,
          grandTotal: orderTotal,
        }),
      });

      if (!response.ok) {
        throw new Error("Fehler beim Speichern der Bestellung");
      }

      // Stocker le montant final pour la vue bancaire
      setFinalTotal(orderTotal);

      // Vider le panier
      clearCart();

      // Passer à l'étape bancaire
      setStep("bank");
    } catch (error) {
      console.error("Erreur commande:", error);
      setErrorMessage("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
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
              <Link href="/" className="btn-primary-cart">
                Zurück zum Shop
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
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="80px"
                        />
                      </div>
                      <div>
                        <p className="cart-item-category">{item.category}</p>
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
                  <Link href="/" className="btn-continue">
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
                  <span>
                    {shippingCost === 0
                      ? "Kostenlos"
                      : `CHF ${shippingCost.toFixed(2).replace(".", ",")}`}
                  </span>
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

      {/* MODALE DE COMMANDE / BANQUE */}
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
                    Bitte geben Sie Ihre Daten ein, um zur Zahlungsanweisung zu gelangen.
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
                      <option value="Deutschland">Deutschland</option>
                      <option value="Österreich">Österreich</option>
                      <option value="Frankreich">Frankreich</option>
                      <option value="Italien">Italien</option>
                      <option value="Liechtenstein">Liechtenstein</option>
                      <option value="Belgien">Belgien</option>
                      <option value="Luxemburg">Luxemburg</option>
                      <option value="Niederlande">Niederlande</option>
                      <option value="Tschechien">Tschechien</option>
                      <option value="Slowakei">Slowakei</option>
                      <option value="Slowenien">Slowenien</option>
                      <option value="Ungarn">Ungarn</option>
                      <option value="Polen">Polen</option>
                      <option value="Spanien">Spanien</option>
                      <option value="Vereinigtes Königreich">Vereinigtes Königreich</option>
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
            ) : (
              /* ÉTAPE 2 : COORDONNÉES BANCAIRES */
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
                    Geben Sie bei der Überweisung bitte Ihren Namen (<strong>{formData.firstName} {formData.lastName}</strong>) als Verwendungszweck an.
                  </p>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn-modal-close"
                    onClick={handleCloseModal}
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
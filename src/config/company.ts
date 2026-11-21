
export interface CompanyConfig {
  // Identité légale
  legalName: string;           // Raison sociale complète (ex: "VELORA AG")
  legalForm: string;           // Forme juridique (ex: "Aktiengesellschaft", "GmbH", "Einzelfirma")
  street: string;              // Rue et numéro
  postalCode: string;          // Code postal
  city: string;                // Ville
  country: string;             // Pays (ex: "Schweiz")

  // Registres officiels
  uid: string;                 // Numéro IDE (Identifikationsnummer der Unternehmen) - format: CHE-XXX.XXX.XXX
  commercialRegister: string;  // Registre du commerce (ex: "Handelsregister des Kantons Zürich, CH-123.4.567.890-1")
  vatNumber: string | null;    // Numéro TVA (ex: "CHE-XXX.XXX.XXX MWST") ou null si non assujetti

  // Représentant légal
  responsiblePerson: string;   // Nom de la personne responsable (ex: "Max Muster, CEO")

  // Contact
  email: string;               // Email principal (ex: "kontact@veloras.ch")
  phone: string;               // Téléphone format affichage (ex: "+41 76 752 94 93")
  phoneRaw: string;            // Téléphone format tel: (ex: "+41767529493")
  openingHours: string;        // Horaires d'ouverture

  // Protection des données (nLPD)
  privacyEmail: string;        // Email pour demandes RGPD/nLPD (peut être identique à email)
  privacyAuthority: string;    // Autorité de surveillance compétente (ex: "Eidgenössischer Datenschutz- und Öffentlichkeitsbeauftragter (EDÖB)")
  supervisoryAuthority: string; // Aufsichtsbehörde für Impressum (optional, branchenspezifisch)
  osPlatformUrl: string;       // URL plateforme OS pour Impressum (optional, ex: "https://ec.europa.eu/consumers/odr/")

  // Livraison
  shippingCarrier: string;     // Transporteur (ex: "Planzer, DPD Schweiz, Poste Suisse")
  deliveryTimeText: string;    // Texte délai livraison (ex: "2 bis 4 Werktage")
  paymentDeadlineDays: number; // Délai paiement virement en jours (ex: 10)

  // Retours & Garantie
  returnPeriodDays: number;           // Délai de retour en jours (ex: 14 ou 30)
  returnShippingCostPolicy: string;   // Qui paie les frais de retour (ex: "Kostenlose Rücksendung bei Widerruf innerhalb der Frist")
  returnRefundDurationDays: number;   // Délai remboursement en jours (ex: 14)
  warrantyText: string;               // Texte garantie (ex: "Herstellergarantie gemäß Schweizer Obligationenrecht. 2 Jahre auf Neuwaren.")
  damageReportDays: number;           // Délai signalement dommages/transport (ex: 2)

  // Conservation des données (pour Datenschutz)
  dataRetentionAccountDays: number;       // Conservation données compte (ex: 30)
  dataRetentionOrderYears: number;        // Conservation données commande (ex: 10)
  dataRetentionInvoiceYears: number;      // Conservation factures (ex: 10)
  dataRetentionContactYears: number;      // Conservation contact (ex: 2)
  dataRetentionLogsDays: number;          // Conservation logs techniques (ex: 90)

  // TVA - exemption possible
  vatExempt: boolean | null;          // true si non assujetti à la TVA (ex: petite entreprise, OSS), null = non défini

  // Marque & Site
  brandName: string;           // Nom de marque affiché (ex: "VELORA")
  siteUrl: string;             // URL canonique (ex: "https://www.veloras.ch")
  authorizedDealer: boolean;   // Revendeur agréé pour marques (CUBE, Benno, O2feel, Granville)
  authorizedBrands: string[];  // Liste des marques dont on est revendeur agréé (ex: ["CUBE", "Benno Bikes", "O2FEEL", "Granville"])

  // Réseaux sociaux (pour JSON-LD sameAs)
  socialLinks: string[];       // URLs des profils sociaux (ex: ["https://instagram.com/velora", "https://facebook.com/velora"])

  // Paiement (pour mentions légales)
  paymentProviders: string[];  // Ex: ["Stripe (Karte, TWINT)", "Banküberweisung"]

  // Politique de retour acceptée (pour metadata)
  returnPolicyAccepted: boolean; // true si le client a confirmé la politique de retour
}

/**
 * Configuration par défaut - TOUS LES CHAMPS SONT À REMPLIR
 * Ne mettez JAMAIS de vraies données ici en dur dans le code.
 * Utilisez des variables d'environnement ou remplissez ce fichier avant le déploiement.
 */
export const companyConfig: CompanyConfig = {
  // Identité légale - À REMPLIR
  legalName: "",                    // À REMPLIR : Raison sociale complète
  legalForm: "",                    // À REMPLIR : Forme juridique
  street: "",                       // À REMPLIR : Rue et numéro
  postalCode: "",                   // À REMPLIR : Code postal
  city: "",                         // À REMPLIR : Ville
  country: "Schweiz",               // À REMPLIR : Pays

  // Registres officiels - À REMPLIR
  uid: "",                          // À REMPLIR : Numéro IDE (CHE-XXX.XXX.XXX)
  commercialRegister: "",           // À REMPLIR : Registre du commerce
  vatNumber: null,                  // À REMPLIR : Numéro TVA ou null

  // Représentant légal - À REMPLIR
  responsiblePerson: "",            // À REMPLIR : Nom du responsable

  // Contact - À REMPLIR (email centralisé ici)
  email: "kontact@veloras.ch",      // À REMPLIR : Email principal
  phone: "+41 76 752 94 93",        // À REMPLIR : Téléphone affichage
  phoneRaw: "+41767529493",         // À REMPLIR : Téléphone format tel:
  openingHours: "Mo. – Fr.: 08:30 – 18:00 | Sa.: 09:00 – 16:00", // À REMPLIR : Horaires

  // Protection des données - À REMPLIR
  privacyEmail: "kontact@veloras.ch", // À REMPLIR : Email protection données
  privacyAuthority: "Eidgenössischer Datenschutz- und Öffentlichkeitsbeauftragter (EDÖB), Feldeggweg 1, 3003 Bern", // À REMPLIR : Autorité
  supervisoryAuthority: "",           // À REMPLIR : Aufsichtsbehörde (falls branchenspezifisch reguliert)
  osPlatformUrl: "",                  // À REMPLIR : OS-Plattform URL (falls zutreffend)

  // Livraison - À REMPLIR
  shippingCarrier: "Planzer / DPD Schweiz / Poste Suisse", // À REMPLIR : Transporteur(s)
  deliveryTimeText: "2 bis 4 Werktage", // À REMPLIR : Délai livraison
  paymentDeadlineDays: 10,          // À REMPLIR : Délai paiement virement (jours)

  // Retours & Garantie - À REMPLIR
  returnPeriodDays: 14,             // À REMPLIR : Délai retour (jours)
  returnShippingCostPolicy: "Kostenlose Rücksendung bei Widerruf innerhalb der Frist. Bei Garantiefällen übernimmt VELORA die Rücksendekosten.", // À REMPLIR : Politique frais retour
  returnRefundDurationDays: 14,     // À REMPLIR : Délai remboursement (jours)
  warrantyText: "Herstellergarantie gemäß Schweizer Obligationenrecht (OR). 2 Jahre Gewährleistung auf Neuwaren ab Lieferung. Batterien und Verschleißteile ausgenommen.", // À REMPLIR : Texte garantie
  damageReportDays: 2,              // À REMPLIR : Délai signalement dommages/transport (jours)

  // Conservation des données (pour Datenschutz) - À REMPLIR
  dataRetentionAccountDays: 30,       // Conservation données compte après suppression (jours)
  dataRetentionOrderYears: 10,        // Conservation données commande (années, Art. 958a OR)
  dataRetentionInvoiceYears: 10,      // Conservation factures (années, Art. 958a OR)
  dataRetentionContactYears: 2,       // Conservation contact (années)
  dataRetentionLogsDays: 90,          // Conservation logs techniques (jours)

  // TVA - exemption possible
  vatExempt: null,                 // À REMPLIR : true si non assujetti à la TVA (ex: petite entreprise, OSS), null = non défini

  // Marque & Site
  brandName: "VELORA",
  siteUrl: "https://www.veloras.ch",
  authorizedDealer: false,          // À REMPLIR : true si revendeur agréé officiel
  authorizedBrands: ["CUBE", "Benno Bikes", "O2FEEL", "Granville"], // À REMPLIR : marques dont on est revendeur agréé

  // Réseaux sociaux (pour JSON-LD sameAs)
  socialLinks: [],                  // À REMPLIR : URLs profils sociaux (ex: Instagram, Facebook)

  // Paiement (pour mentions légales)
  paymentProviders: ["Banküberweisung"], // À REMPLIR : Ajouter "Stripe (Karte, TWINT)" après intégration

  // Politique de retour acceptée (pour metadata)
  returnPolicyAccepted: false, // À REMPLIR : true si le client a confirmé la politique de retour
};

/**
 * Liste des champs obligatoires pour la conformité Google Merchant Center
 * Utilisée par le script de validation au build
 */
export const REQUIRED_FIELDS: (keyof CompanyConfig)[] = [
  "legalName",
  "legalForm",
  "street",
  "postalCode",
  "city",
  "country",
  "uid",
  "commercialRegister",
  "responsiblePerson",
  "email",
  "phone",
  "phoneRaw",
  "openingHours",
  "privacyEmail",
  "privacyAuthority",
  "shippingCarrier",
  "deliveryTimeText",
  "paymentDeadlineDays",
  "returnPeriodDays",
  "returnShippingCostPolicy",
  "returnRefundDurationDays",
  "warrantyText",
  "damageReportDays",
  "dataRetentionAccountDays",
  "dataRetentionOrderYears",
  "dataRetentionInvoiceYears",
  "dataRetentionContactYears",
  "dataRetentionLogsDays",
  "siteUrl",
];

/**
 * Vérifie la configuration et retourne les champs manquants
 * À appeler au build pour afficher les avertissements
 */
export function validateCompanyConfig(): { missing: string[]; warnings: string[] } {
  const missing: string[] = [];
  const warnings: string[] = [];

  for (const field of REQUIRED_FIELDS) {
    const value = companyConfig[field];
    if (value === "" || value === null || (Array.isArray(value) && value.length === 0)) {
      missing.push(field);
    }
  }

  // Avertissements spécifiques
  if (!companyConfig.vatNumber) {
    warnings.push("vatNumber: Non assujetti à la TVA (confirmer si correct)");
  }
  if (!companyConfig.authorizedDealer) {
    warnings.push("authorizedDealer: false - Marquer true si revendeur agréé officiel CUBE/Benno/O2feel/Granville");
  }
  if (companyConfig.paymentProviders.length === 1 && companyConfig.paymentProviders[0] === "Banküberweisung") {
    warnings.push("paymentProviders: Seulement virement bancaire - Intégrer Stripe pour cartes/TWINT");
  }

  return { missing, warnings };
}

/**
 * Helper pour obtenir l'adresse formatée (pour Impressum, footer, JSON-LD)
 */
export function getFormattedAddress(): string {
  const { street, postalCode, city, country } = companyConfig;
  if (!street || !postalCode || !city) return "";
  return `${street}, ${postalCode} ${city}, ${country}`;
}

/**
 * Helper pour les métadonnées Open Graph / JSON-LD
 * Prevents double slashes by normalizing both base URL and path
 */
export function getSiteUrl(path: string = ""): string {
  const base = companyConfig.siteUrl.replace(/\/$/, "");
  if (!path) return base;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
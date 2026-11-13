#!/usr/bin/env tsx
/**
 * Script de validation de la configuration entreprise au build
 * Affiche les champs manquants sans bloquer le build
 */

import { validateCompanyConfig, companyConfig } from "../src/config/company";

console.log("\n🔍 === VALIDATION CONFIGURATION ENTREPRISE VELORA ===\n");

const { missing, warnings } = validateCompanyConfig();

if (missing.length > 0) {
  console.log("❌ CHAMPS OBLIGATOIRES MANQUANTS (à remplir dans src/config/company.ts) :");
  missing.forEach((field) => {
    console.log(`   • ${field}`);
  });
  console.log("");
} else {
  console.log("✅ Tous les champs obligatoires sont remplis.\n");
}

if (warnings.length > 0) {
  console.log("⚠️  AVERTISSEMENTS :");
  warnings.forEach((warn) => {
    console.log(`   • ${warn}`);
  });
  console.log("");
}

console.log("📋 RÉSUMÉ CONFIGURATION ACTUELLE :");
console.log(`   Raison sociale : ${companyConfig.legalName || "❌ MANQUANT"}`);
console.log(`   Forme juridique : ${companyConfig.legalForm || "❌ MANQUANT"}`);
console.log(`   Adresse : ${companyConfig.street || "❌"}, ${companyConfig.postalCode || "❌"} ${companyConfig.city || "❌"}, ${companyConfig.country}`);
console.log(`   IDE : ${companyConfig.uid || "❌ MANQUANT"}`);
console.log(`   Registre commerce : ${companyConfig.commercialRegister || "❌ MANQUANT"}`);
console.log(`   TVA : ${companyConfig.vatNumber || "Non assujetti (null)"}`);
console.log(`   Responsable : ${companyConfig.responsiblePerson || "❌ MANQUANT"}`);
console.log(`   Email : ${companyConfig.email}`);
console.log(`   Téléphone : ${companyConfig.phone}`);
console.log(`   Transporteur : ${companyConfig.shippingCarrier}`);
console.log(`   Délai livraison : ${companyConfig.deliveryTimeText}`);
console.log(`   Délai retour : ${companyConfig.returnPeriodDays} jours`);
console.log(`   Site URL : ${companyConfig.siteUrl}`);
console.log(`   Revendeur agréé : ${companyConfig.authorizedDealer ? "Oui" : "Non"}`);
console.log(`   Moyens de paiement : ${companyConfig.paymentProviders.join(", ")}`);

console.log("\n=== FIN VALIDATION ===\n");

// Ne pas faire échouer le build - seulement avertir
process.exit(0);
# MISSING_INFO.md — Informations manquantes pour VELORA (veloras.ch)

> Ce fichier liste toutes les données que le client doit encore fournir pour la conformité Google Merchant Center et la mise en production. Il est mis à jour automatiquement à chaque build via le script de validation.

---

## 1. Configuration Entreprise (`src/config/company.ts`)

| Champ | Statut | Commentaire |
|-------|--------|-------------|
| `legalName` | ❌ MANQUANT | Raison sociale complète (ex: "VELORA AG") |
| `legalForm` | ❌ MANQUANT | Forme juridique (ex: "Aktiengesellschaft", "GmbH", "Einzelfirma") |
| `street` | ❌ MANQUANT | Rue et numéro |
| `postalCode` | ❌ MANQUANT | Code postal |
| `city` | ❌ MANQUANT | Ville |
| `country` | ✅ "Schweiz" | Pays |
| `uid` | ❌ MANQUANT | Numéro IDE (format: CHE-XXX.XXX.XXX) |
| `commercialRegister` | ❌ MANQUANT | Registre du commerce (ex: "Handelsregister des Kantons Zürich, CH-123.4.567.890-1") |
| `vatNumber` | ⚠️ `null` | Non assujetti à la TVA — **confirmer si correct** |
| `responsiblePerson` | ❌ MANQUANT | Nom du responsable légal (ex: "Max Muster, CEO") |
| `email` | ✅ "kontact@veloras.ch" | Email principal — **vérifier: `kontact@` ou `kontakt@` ?** |
| `phone` | ✅ "+41 76 752 94 93" | Téléphone affichage |
| `phoneRaw` | ✅ "+41767529493" | Téléphone format `tel:` |
| `openingHours` | ✅ "Mo. – Fr.: 08:30 – 18:00 \| Sa.: 09:00 – 16:00" | Horaires d'ouverture |
| `privacyEmail` | ✅ "kontact@veloras.ch" | Email protection données (nLPD/DSGVO) |
| `privacyAuthority` | ✅ "EDÖB" | Autorité de surveillance |
| `shippingCarrier` | ✅ "Planzer / DPD Schweiz / Poste Suisse" | Transporteur(s) |
| `deliveryTimeText` | ✅ "2 bis 4 Werktage" | Délai livraison |
| `paymentDeadlineDays` | ✅ 10 | Délai paiement virement (jours) |
| `returnPeriodDays` | ✅ 14 | Délai retour (jours) |
| `returnShippingCostPolicy` | ✅ Rempli | Politique frais retour |
| `returnRefundDurationDays` | ✅ 14 | Délai remboursement (jours) |
| `warrantyText` | ✅ Rempli | Texte garantie |
| `brandName` | ✅ "VELORA" | Nom de marque |
| `siteUrl` | ✅ "https://www.veloras.ch" | URL canonique |
| `authorizedDealer` | ⚠️ `false` | **Marquer `true` si revendeur agréé officiel CUBE/Benno/O2feel/Granville** |
| `paymentProviders` | ⚠️ `["Banküberweisung"]` | **Ajouter "Stripe (Karte, TWINT)" après intégration** |

---

## 2. Produits sans GTIN / MPN

> Tous les produits listés ci-dessous sont exclus du flux Google Merchant Center tant que `gtin` ou `mpn` et `brand` ne sont pas renseignés en base.

| Produit ID | Titre | Marque | Catégorie | GTIN | MPN |
|------------|-------|--------|-----------|------|-----|
| *(à remplir après migration BDD)* | | | | | |

> **Action requise** : Exécuter `npx tsx scripts/migrate-products.ts` puis renseigner GTIN/MPN dans l'admin pour chaque produit.

---

## 3. Descriptions Produits à Enrichir

> Produits dont la description fait une seule ligne ou semble incomplète.

| Produit ID | Titre | Problème |
|------------|-------|----------|
| *(à auditer)* | | |

---

## 4. Prix Barrés à Justifier (`price_verified = true`)

> Produits avec `compareAtPrice` défini mais `price_verified = false`. Le prix barré ne s'affiche pas tant que non vérifié.

| Produit ID | Titre | Prix actuel | Ancien prix | Statut |
|------------|-------|-------------|-------------|--------|
| *(à auditer en base)* | | | | `price_verified: false` |

---

## 5. Question Email

**`kontact@veloras.ch` ou `kontakt@veloras.ch` ?**
- Actuellement configuré : `kontact@veloras.ch` (avec un 'c')
- Standard allemand : `kontakt@` (avec un 'k')
- **À confirmer avec le client** et mettre à jour partout si nécessaire.

---

## 6. Question Marque : UTO / EVOALT vs EOVOLT

**Produit concerné :** `city-uto-ex-eovolt` — "UTO EX EVOALT Evening Origins"

- Marque affichée : `UTO / EVOALT`
- Le nom "EVOALT" dans le titre du produit suggère un lien avec la marque **EOVOLT** (vélos pliants électriques français)
- **Action requise** : Confirmer si c'est bien la marque **EOVOLT** ou une marque distincte **UTO / EVOALT**
- Impact : Google Merchant Center (brand), filtres, JSON-LD, flux RSS

---

## 6. Variables d'Environnement Vercel (à configurer)

| Variable | Requis | Description |
|----------|--------|-------------|
| `TURSO_DATABASE_URL` | ✅ | URL base de données Turso |
| `TURSO_AUTH_TOKEN` | ✅ | Token auth Turso |
| `STRIPE_SECRET_KEY` | ⏳ | Pour paiements carte/TWINT (plus tard) |
| `STRIPE_WEBHOOK_SECRET` | ⏳ | Webhook Stripe |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ⏳ | Clé publique Stripe |
| `NEXT_PUBLIC_SITE_URL` | ✅ | `https://www.veloras.ch` |
| `NEXT_PUBLIC_GA_ID` | ⏳ | Google Analytics Measurement ID (G-XXXXXXXXXX) |
| `NEXT_PUBLIC_GTM_ID` | ⏳ | Google Tag Manager Container ID (GTM-XXXXXXX) |
| `NEXT_PUBLIC_META_PIXEL_ID` | ⏳ | Meta Pixel ID |
| `SMTP_HOST` | ✅ | Serveur SMTP sortant |
| `SMTP_PORT` | ✅ | Port SMTP (587/465) |
| `SMTP_USER` | ✅ | Utilisateur SMTP |
| `SMTP_PASS` | ✅ | Mot de passe SMTP |
| `SMTP_FROM` | ✅ | Expéditeur emails (ex: "VELORA <noreply@veloras.ch>") |
| `NEXT_PUBLIC_CONTACT_EMAIL` | ✅ | Email contact (ex: kontakt@veloras.ch) |

---

## 7. Migrations à Exécuter

```bash
# 1. Créer les tables et seeder les produits
npx tsx scripts/migrate-products.ts

# 2. (Optionnel) Migration localStorage swissholz_cart → velora_cart
#    À faire côté client au premier chargement
```

---

## 8. Tests à Effectuer Avant Mise en Production

| Test | Commande / Outil | Critère de réussite |
|------|------------------|---------------------|
| Build Next.js | `npm run build` | ✅ Sans erreurs (warnings config OK) |
| Lint | `npm run lint` | ✅ Sans erreurs |
| Redirections 301 | `curl -I https://veloras.ch/products` | `301 → https://www.veloras.ch/produkte` |
| Canonical par page | Vérifier `<link rel="canonical">` | URL propre de la page |
| JSON-LD Produit | [Rich Results Test](https://search.google.com/test/rich-results) | ✅ Valide, pas d'erreurs |
| JSON-LD Organization | [Rich Results Test](https://search.google.com/test/rich-results) | ✅ Valide |
| Sitemap.xml | `GET /sitemap.xml` | ✅ 200, toutes URLs listées |
| Robots.txt | `GET /robots.txt` | ✅ 200, contient `Sitemap:` |
| Flux GMC | `GET /feed/google-merchant.xml` | ✅ 200, XML valide RSS 2.0 + g:ns |
| Page 404 | Visiter `/page-inexistante` | ✅ Page allemande personnalisée |
| Consent Mode v2 | DevTools → Application → Cookies | Scripts GA/GTM/Meta bloqués sans consentement |
| localStorage migration | DevTools → localStorage | `velora_cart` présent, `swissholz_cart` absent |

---

*Dernière mise à jour : Build automatique — voir logs de validation au démarrage*

---

## 9. Résumé des Modifications Effectuées (PHASES C, D, E)

### PHASE C — Champs de Prix & Avis
- **Nouveaux champs DB** (`src/lib/schema.ts`) : `compareAtPrice` (nullable), `priceVerified` (boolean, défaut false), `reviewsVerified` (boolean, défaut false)
- **Interface Product** (`src/data/products.ts`) : Ajout de `compareAtPrice`, `priceVerified`, `reviewsVerified` + champs GMC (gtin, mpn, condition, availability, color, size, gender, ageGroup, etc.)
- **Produits** : Migration des `oldPrice` → `compareAtPrice`, correction du texte dupliqué "6061 6061" sur O2FEEL
- **Affichage conditionnel** : Prix barré, pourcentage remise, "Sie sparen" + badge ANGEBOT **uniquement si** `compareAtPrice` ET `priceVerified=true`
- **Avis/Stars** : Affichage masqué derrière flag `reviewsVerified` (par défaut false)
- **Délai livraison** : Remplacement "2 bis 4 Werktage" hardcodé par `c.deliveryTimeText` (company config)

### PHASE D — JSON-LD & Flux GMC
- **Product JSON-LD** (`src/app/produit/[id]/page.tsx`) : Offre complète avec price, currency, availability, url, itemCondition, seller, shippingDetails (gratuit CH/LI), hasMerchantReturnPolicy
- **aggregateRating** : Ajouté **uniquement** si `rating`, `reviewsCount` ET `reviewsVerified=true`
- **BreadcrumbList JSON-LD** : Produit (4 niveaux) + Catégories (3 niveaux)
- **Flux GMC** (`src/app/feed/google-merchant.xml/route.ts`) : RSS 2.0 + g:ns, exclut produits sans GTIN/MPN/brand/condition/availability/googleProductCategory, log des exclusions console.warn

### PHASE E — Pages Légales Nettoyées
- **Retrait bannière "Entwurf"** et suppression des placeholders visibles `[...À REMPLIR...]` dans les 5 pages légales
- **Rendu conditionnel** : Sections/champs masqués si valeur absente dans `companyConfig`
- **Cookies page** : Suppression `velora_admin_session` (admin non public), `swissholz_cart` (legacy), GA/Meta/Stripe listés **seulement si** réellement chargés via Consent Mode v2
- **Pas de clauses inventées** : Contenu légal lu depuis `companyConfig`, pas de texte par défaut inventé

### Fichiers Modifiés Principaux
| Fichier | Changement |
|---------|------------|
| `src/lib/schema.ts` | Nouveaux champs DB produits + table reviews |
| `src/data/products.ts` | Interface Product étendue, productsData mis à jour |
| `src/app/produkt/[id]/page.tsx` | JSON-LD Product + BreadcrumbList, affichage conditionnel prix/avis |
| `src/app/kategorie/[category]/page.tsx` | JSON-LD BreadcrumbList |
| `src/app/feed/google-merchant.xml/route.ts` | Flux GMC complet avec exclusions loguées |
| `src/components/LegalDocument.tsx` | Retrait bannière Entwurf |
| `src/app/legal/impressum/page.tsx` | Rendu conditionnel, nettoyage |
| `src/app/legal/versand-retouren/page.tsx` | Rendu conditionnel, nettoyage |
| `src/app/legal/terms/page.tsx` | Rendu conditionnel, nettoyage, fix duplication |
| `src/app/legal/privacy/page.tsx` | Rendu conditionnel, nettoyage |
| `src/app/legal/cookies/page.tsx` | Table nettoyée (admin/legacy retirés) |
| `src/components/ProductCard.tsx` | Badge ANGEBOT + prix conditionnels |
| `src/components/BestSellers.tsx` | Badge + prix conditionnels |
| `src/components/Poele.tsx` | Badge + prix conditionnels |
| `src/components/SearchBar.tsx` | Prix conditionnels |
| `src/context/CartContext.tsx` | CartItem: oldPrice → compareAtPrice |

### Variables Vercel à Configurer (inchangé)
Voir section 6 ci-dessus.

### Prochaines Étapes Client
1. Remplir `src/config/company.ts` (champs ❌ MANQUANT)
2. Exécuter migration : `npx tsx scripts/migrate-products.ts`
3. Renseigner GTIN/MPN/brand/condition/availability/googleProductCategory en base pour chaque produit
4. Valider `priceVerified=true` pour produits avec prix barré justifié
5. Configurer `authorizedDealer=true` si revendeur officiel
6. Ajouter `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID` pour Consent Mode v2
7. Tests pré-production (voir section 8)
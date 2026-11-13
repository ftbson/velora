# MISE À JOUR GOOGLE MERCHANT CENTER — VELORA

**Date :** 2026-11-13  
**Version :** 1.0  
**Statut :** Implémentation terminée — Configuration requise

---

## 📋 RÉSUMÉ EXÉCUTIF

Ce document récapitule l'ensemble des modifications apportées pour rendre le site **VELORA** (boutique suisse de vélos électriques) **conforme aux exigences de Google Merchant Center (GMC)**.

Le site a été audité et **aurait été rejeté** dans son état initial. Toutes les tâches techniques ont été implémentées. Il reste désormais à **remplir la configuration centrale** (`src/config/company.ts`) avec les **données réelles de l'entreprise** et à configurer les **variables d'environnement** sur Vercel.

---

## ✅ TÂCHES IMPLÉMENTÉES (9/9)

| # | Tâche | Statut | Fichiers principaux |
|---|-------|--------|---------------------|
| 1 | Configuration centralisée (`company.ts`) + validation build-time | ✅ | `src/config/company.ts`, `scripts/validate-config.ts`, `package.json` |
| 2 | Pages légales complètes (Impressum, Versand & Retouren, AGB, Datenschutz, Cookies) | ✅ | `src/app/legal/*/page.tsx` |
| 3 | JSON-LD structuré (Organization, Product, BreadcrumbList, Shipping, Returns) | ✅ | `src/app/layout.tsx`, `src/app/produkt/[id]/page.tsx` |
| 4 | Flux Google Merchant Center (RSS 2.0 + namespace `g:`) | ✅ | `src/app/feed/google-merchant.xml/route.ts` |
| 5 | Schéma DB étendu (produits GMC, avis vérifiés, commandes) + migration | ✅ | `src/lib/schema.ts`, `scripts/migrate-products.ts` |
| 6 | Sitemap dynamique + robots.txt + 404 allemande | ✅ | `src/app/sitemap.xml/route.ts`, `src/app/robots.txt/route.ts`, `src/app/not-found.tsx` |
| 7 | Unification URLs (allemand) + redirections 301 middleware | ✅ | `src/middleware.ts`, `src/app/warenkorb/`, `src/app/anmelden/`, `src/app/konto/`, pages redirect |
| 8 | Stripe Checkout (carte + TWINT) + Webhook | ✅ | `src/app/api/checkout/session/route.ts`, `src/app/api/checkout/stripe/route.ts`, `src/components/StripeCheckout.tsx` |
| 9 | Cookie Banner Consent Mode v2 (GA4, Meta Pixel, GTM) | ✅ | `src/components/CookieBanner.tsx` |

---

## 📁 FICHIERS CRÉÉS / MODIFIÉS

### Configuration centrale
- `src/config/company.ts` — **Source unique de vérité** pour toutes les données légales, contact, marque, livraison, retours, garantie, paiement
- `scripts/validate-config.ts` — Validation au build (warnings seulement, ne fait pas échouer le build)
- `package.json` — Script `validate:config` ajouté, `build` lance la validation avant compilation, dépendance `tsx` ajoutée

### Pages légales (allemand, conformes droit suisse / nLPD)
- `src/app/legal/impressum/page.tsx` — Impressum complet (identité, UID, registre du commerce, TVA, personne responsable, contact, autorité de surveillance, résolution des litiges)
- `src/app/legal/versand-retouren/page.tsx` — Livraison (CH/LI, gratuite, transporteur/délai depuis config), paiement (depuis config), rétractation 14j, retours (conditions/coûts/durée remboursement depuis config), garantie (texte depuis config), réclamations
- `src/app/legal/terms/page.tsx` — CGV complètes (fournisseur, langue contrat, produits/dispo, prix/TVA, commande/conclusion, paiement, livraison, réserve de propriété, droit de rétractation consommateur instruction complète, garantie, responsabilité, renvoi protection données, droit suisse/for exclusif, clause salvatrice, date version)
- `src/app/legal/privacy/page.tsx` — Protection données nLPD/RGPD (responsable, catégories données tableau, finalités/bases légales tableau, destinataires Vercel/Turso/SMTP/Stripe/transporteurs, transferts internationaux EU-US DPF/SCC, durées conservation 10 ans comptabilité, cookies/localStorage résumé, droits personnes concernées, autorité EDÖB, mesures sécurité, liens tiers, date version)
- `src/app/legal/cookies/page.tsx` — Politique cookies détaillée (tableau toutes technologies : cookies session, localStorage panier/favoris/consent, GA4, Meta Pixel, Stripe, catégories consentement, détails Consent Mode v2, gestion navigateur, contact)

### SEO & Données structurées (JSON-LD)
- `src/app/layout.tsx` — `Organization` + `Website` schemas via `metadata.other`, `metadataBase` depuis config `siteUrl`, Open Graph complet, `lang="de-CH"`
- `src/app/produkt/[id]/page.tsx` — `Product` JSON-LD complet (name, description, images, sku, brand, gtin/mpn, offers avec price/availability/url/condition/seller, `shippingDetails` gratuit CH/LI avec délai, `hasMerchantReturnPolicy` depuis config), `BreadcrumbList` JSON-LD + breadcrumb visible microdata, **suppression faux avis** (rating/reviewsCount), ancien prix seulement si `price_verified=true`, délai livraison depuis config

### Flux Google Merchant Center
- `src/app/feed/google-merchant.xml/route.ts` — RSS 2.0 namespace `g:`, **tous attributs requis** : id, title, description, link, image_link, additional_image_link, price (CHF), sale_price (si vérifié), availability, condition, brand, gtin, mpn, identifier_exists, google_product_category, product_type, shipping (CH::0.00 CHF, LI::0.00 CHF), attributs habillement (color, size, gender, age_group), vélos enfants (age_group), **exclusion** produits draft / champs requis manquants, log exclusions

### Base de données (Drizzle + Turso/libSQL)
- `src/lib/schema.ts` — Table `products` étendue (tous champs GMC : gtin, mpn, availability, condition, stock_quantity, additional_images, color, size, gender, age_group, motor_torque, battery_capacity, specs_*, details JSON, badge_promo, discount, savings, is_new, is_draft, rating, reviews_count, reviews_verified), table `reviews` pour `aggregateRating` vérifié futur, table `orders` étendue (payment_method, payment_reference, paid_at)
- `scripts/migrate-products.ts` — Migration créant tables produits/avis, ajoutant colonnes orders, seed depuis `productsData` actuel

### Sitemap / Robots / 404
- `src/app/sitemap.xml/route.ts` — Dynamique, toutes routes statiques (URLs allemandes) + URLs produits, `image:sitemap` pour images produits
- `src/app/robots.txt/route.ts` — Dynamique, référence sitemap, disallow zones privées
- `src/app/not-found.tsx` — 404 allemande personnalisée (recherche/accueil/contact depuis config)

### Unification URLs + Middleware
- `src/middleware.ts` — **Redirections 301** map complet (FR/mixte → DE) : `/panier` `/cart` → `/warenkorb`, `/connexion` `/login` → `/anmelden`, `/compte` → `/konto`, `/a-propos` `/about` → `/ueber-uns`, `/contact` → `/kontakt`, `/products` `/shop` → `/produkte`, catégories `/categorie/*` → `/kategorie/*`, légal `/legal/*` → `/legal/*` (noms DE), **en-têtes sécurité** (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy, HSTS prod)
- Nouvelles pages DE : `src/app/warenkorb/page.tsx`, `src/app/anmelden/page.tsx`, `src/app/konto/page.tsx`
- Pages redirect 301 : `/panier`, `/cart`, `/connexion`, `/login`, `/compte`

### Stripe Paiement
- `src/app/api/checkout/session/route.ts` — Création session Checkout (card / twint), métadonnées order_id, success/cancel URLs, customer_email, locale DE, adresses facturation/livraison CH/LI
- `src/app/api/checkout/stripe/route.ts` — Webhook `checkout.session.completed`, `expired`, `payment_intent.succeeded/failed` — mise à jour statut commande, envoi email confirmation
- `src/components/StripeCheckout.tsx` — Composant client sélection paiement (carte/TWINT), appel API session, redirection Stripe

### Cookie Consent Mode v2
- `src/components/CookieBanner.tsx` — Consent Mode v2 complet (`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`), chargement conditionnel GA4/GTM/Meta Pixel **après consentement**, gestion localStorage consent state, réouverture via event `velora:open-cookie-banner`

### UI / Composants
- `src/components/Footer.tsx` — Adresse complète, email, téléphone, heures, lien Impressum, UID depuis config, URLs allemandes
- `src/components/Navbar.tsx` — URLs unifiées allemandes (`/produkte`, `/kategorie/*`, `/warenkorb`, `/wunschliste`, `/anmelden`, `/konto`, `/ueber-uns`, `/kontakt`)
- `src/app/a-propos/page.tsx` — Page « Über uns » réécrite (profil entreprise réel, marques distribuées avec drapeau `authorizedDealer`, localisation/contact depuis config)

---

## ⚠️ ACTIONS REQUISES AVANT MISE EN PRODUCTION

### 1. Remplir `src/config/company.ts` (OBLIGATOIRE)

Tous les champs sont vides avec commentaire `// À REMPLIR`. **Remplacer par les vraies données :**

```typescript
// Exemple minimal à compléter :
legalName: "VELORA AG",
legalForm: "Aktiengesellschaft",
address: { street: "Hauptstrasse 123", postalCode: "8001", city: "Zürich", country: "CH" },
uid: "CHE-123.456.789",
vatNumber: "CHE-123.456.789 MWST",
commercialRegister: { office: "Zürich", number: "CH-123.4.567.890-1" },
contact: { email: "info@veloras.ch", phone: "+41 44 123 45 67", whatsapp: "+41 79 123 45 67", hours: "Mo–Fr 09:00–18:00, Sa 10:00–16:00" },
privacy: { dataProtectionOfficer: "Max Mustermann", dpEmail: "datenschutz@veloras.ch" },
shipping: { carrier: "Swiss Post", deliveryTimeDays: "2–3", freeShippingThreshold: 0, countries: ["CH", "LI"] },
returns: { withdrawalDays: 14, returnAddress: { ... }, returnCostsCustomer: true, refundDays: 14 },
warranty: { text: "2 ans garantie légale..." },
brand: { name: "VELORA", logoUrl: "https://www.veloras.ch/img/logo.svg", authorizedDealer: true },
paymentProviders: ["Stripe (Visa, Mastercard, Amex)", "TWINT", "Virement bancaire"],
siteUrl: "https://www.veloras.ch",
paymentDeadlineDays: 10,
```

**⚠️ Règle d'or :** Ne **jamais** inventer de données. Si une info manque → laisser vide, le build affichera un **warning** (pas d'erreur). **Jamais** d'affichage avec crochets `[...]` pour le visiteur.

### 2. Variables d'environnement Vercel (OBLIGATOIRE)

| Variable | Description | Requis |
|----------|-------------|--------|
| `TURSO_DATABASE_URL` | URL base Turso/libSQL | ✅ |
| `TURSO_AUTH_TOKEN` | Token auth Turso | ✅ |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (sk_live_...) | ✅ |
| `STRIPE_WEBHOOK_SECRET` | Signature webhook (whsec_...) | ✅ |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe (pk_live_...) | ✅ |
| `NEXT_PUBLIC_SITE_URL` | URL site (ex: https://www.veloras.ch) | ✅ |
| `NEXT_PUBLIC_GA_ID` | ID GA4 (G-XXXXXXXXXX) | Pour analytics |
| `NEXT_PUBLIC_GTM_ID` | ID GTM (GTM-XXXXXXX) | Pour GTM |
| `NEXT_PUBLIC_META_PIXEL_ID` | ID Meta Pixel | Pour marketing |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` | Config email Nodemailer | Pour emails commande |

### 3. Migration base de données (OBLIGATOIRE)

```bash
npx tsx scripts/migrate-products.ts
```
Nécessite `TURSO_DATABASE_URL` et `TURSO_AUTH_TOKEN` définis.

### 4. Données produits (REQUIS POUR GMC)

Dans l'admin / base de données, pour **chaque produit** :
- ✅ `gtin` (EAN/GTIN) — **Requis GMC**
- ✅ `mpn` (référence fabricant) — **Requis GMC si pas GTIN**
- ✅ `stock_quantity` — Disponibilité
- ✅ `condition` : `"new"` / `"used"` / `"refurbished"`
- ✅ `availability` : `"in_stock"` / `"out_of_stock"` / `"preorder"` / `"backorder"`
- ✅ `additional_images` : URLs images supplémentaires
- Pour **vêtements/accessoires** : `color`, `size`, `gender` (`men`/`women`/`unisex`), `age_group` (`adult`/`kids`)
- Pour **vélos enfants** : `age_group` (`kids`)

### 5. Assets visuels
- `public/img/og-default.jpg` — Image Open Graph par défaut (1200×630)
- `public/img/favicon.ico` + `public/img/apple-touch-icon.png`

---

## ✅ CHECKLIST DE VALIDATION POST-CONFIGURATION

### Build & Config
- [ ] `npm run build` — **0 erreurs**, warnings seulement pour champs config manquants
- [ ] `npm run validate:config` — Affiche les champs manquants

### Google Merchant Center
- [ ] Flux accessible : `https://www.veloras.ch/feed/google-merchant.xml`
- [ ] Valider dans GMC : **Produits** → **Flux** → **Tester le flux**
- [ ] Vérifier : 0 erreurs critiques, 0 avertissements bloquants
- [ ] `identifier_exists: false` pour produits sans GTIN/MPN (vélos sur mesure)

### JSON-LD / SEO
- [ ] Test **Google Rich Results Test** : `https://search.google.com/test/rich-results`
  - URL produit → valider `Product`, `Offer`, `BreadcrumbList`, `Organization`
- [ ] `siteUrl` dans config = URL canonique (www + https)
- [ ] Sitemap : `https://www.veloras.ch/sitemap.xml` valide
- [ ] Robots.txt : `https://www.veloras.ch/robots.txt` valide

### Paiement Stripe
- [ ] Test mode **test** d'abord (clés `sk_test_...`, `pk_test_...`)
- [ ] Créer webhook Stripe Dashboard → `https://www.veloras.ch/api/checkout/stripe`
  - Événements : `checkout.session.completed`, `checkout.session.expired`, `payment_intent.succeeded`, `payment_intent.payment_failed`
- [ ] Test paiement carte + TWINT
- [ ] Vérifier email confirmation reçu
- [ ] Vérifier commande en base (statut `paid`, `payment_reference`, `paid_at`)

### Redirections 301
- [ ] `/panier` → `/warenkorb` (301)
- [ ] `/cart` → `/warenkorb` (301)
- [ ] `/connexion` → `/anmelden` (301)
- [ ] `/login` → `/anmelden` (301)
- [ ] `/compte` → `/konto` (301)
- [ ] `/a-propos` → `/ueber-uns` (301)
- [ ] `/contact` → `/kontakt` (301)
- [ ] `/products` → `/produkte` (301)
- [ ] `/categorie/ville` → `/kategorie/ville` (301) — idem toutes catégories
- [ ] `/legal/agb` → `/legal/terms` (301) — idem toutes pages légales

### Cookies / Consent Mode v2
- [ ] Banner s'affiche au premier visite
- [ ] « Alle akzeptieren » → scripts GA4/GTM/Meta Pixel chargés
- [ ] « Nur notwendige » → aucun script analytics/marketing chargé
- [ ] Vérifier `dataLayer` dans console : `consent_update` avec bons flags
- [ ] Lien « Einstellungen » dans footer rouvre bandeau

### Pages légales
- [ ] `/legal/impressum` — Infos complètes, UID cliquable (recherche Zefix)
- [ ] `/legal/versand-retouren` — Infos livraison/paiement/retours/garantie cohérentes avec config
- [ ] `/legal/terms` — CGV complètes, droit rétractation instruction type UE
- [ ] `/legal/privacy` — nLPD/RGPD, tableau catégories/bases légales, destinataires, transferts, droits, EDÖB
- [ ] `/legal/cookies` — Tableau technologies, Consent Mode v2 détaillé

### Compte client
- [ ] `/anmelden` — Connexion / inscription fonctionnelle
- [ ] `/konto` — Historique commandes affiché
- [ ] `/warenkorb` — Panier, formulaire, choix paiement, modal banque/Stripe

---

## 🔧 ARCHITECTURE TECHNIQUE CLÉE

```
velora/
├── src/
│   ├── config/
│   │   └── company.ts           # ← CONFIG CENTRALE (source unique)
│   ├── app/
│   │   ├── feed/google-merchant.xml/route.ts   # Flux GMC
│   │   ├── sitemap.xml/route.ts                # Sitemap dynamique
│   │   ├── robots.txt/route.ts                 # Robots dynamique
│   │   ├── not-found.tsx                       # 404 DE
│   │   ├── legal/*/page.tsx                    # Pages légales DE
│   │   ├── produkt/[id]/page.tsx               # Produit + JSON-LD
│   │   ├── warenkorb/page.tsx                  # Panier DE (nouveau)
│   │   ├── anmelden/page.tsx                   # Auth DE (nouveau)
│   │   ├── konto/page.tsx                      # Compte DE (nouveau)
│   │   ├── api/
│   │   │   ├── checkout/session/route.ts       # Session Stripe
│   │   │   └── checkout/stripe/route.ts        # Webhook Stripe
│   │   └── layout.tsx                          # JSON-LD Org + OG
│   ├── components/
│   │   ├── CookieBanner.tsx                    # Consent Mode v2
│   │   ├── StripeCheckout.tsx                  # Paiement client
│   │   ├── Footer.tsx                          # Footer DE + config
│   │   └── Navbar.tsx                          # Nav DE unifiée
│   ├── lib/
│   │   └── schema.ts                           # Schéma DB Drizzle
│   └── middleware.ts                           # Redirects 301 + sécurité
├── scripts/
│   ├── validate-config.ts                      # Validation build-time
│   └── migrate-products.ts                     # Migration DB
└── package.json                                # Scripts build/validate
```

---

## 📌 PRINCIPES RESPECTÉS

| Principe | Application |
|----------|-------------|
| **Config centralisée** | `src/config/company.ts` = seule source, helpers `getCompanyAddress()`, `formatPrice()` |
| **Warnings build, pas erreurs** | `validate-config.ts` loggue `⚠️` mais `process.exit(0)` |
| **Pas de crochets visiteur** | Helpers retournent `""` ou fallback si config vide |
| **Pas de casser l'existant** | Redirections 301 préservent SEO, middleware non-bloquant |
| **Allemand (de-CH) / CHF / CH+LI** | `lang="de-CH"`, prix CHF, livraison gratuite CH/LI, TVA suisse |
| **Données réelles seulement** | Champs vides = warnings build, pas de données fictives |

---

## 🚀 PROCHAINES ÉTAPES RECOMMANDÉES

1. **Remplir `company.ts`** avec données juridiques réelles (extrait registre commerce, attestation TVA, statuts)
2. **Configurer variables Vercel** (voir tableau §2)
3. **Lancer migration** `npx tsx scripts/migrate-products.ts`
4. **Enrichir produits** en base (GTIN, MPN, stock, attributs GMC)
5. **Tester flux GMC** → corriger erreurs éventuelles
6. **Tester Stripe** (mode test → mode live)
7. **Valider JSON-LD** (Rich Results Test)
8. **Soumettre flux** dans Merchant Center
9. **Monitoring** : Search Console, Merchant Center, logs build Vercel

---

## 📞 SUPPORT & CONTACT

Pour questions techniques sur cette implémentation :
- Vérifier les logs de build Vercel (warnings `validate:config`)
- Consulter `scripts/validate-config.ts` pour liste champs requis
- Tester endpoints : `/feed/google-merchant.xml`, `/sitemap.xml`, `/robots.txt`

---

**Document généré automatiquement — À archiver avec le projet VELORA.**
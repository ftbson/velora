# VELORA (veloras.ch) — Google Merchant Center Compliance Summary

**Status**: ✅ Build passing (97 routes generated)  
**Date**: 2026-11-18  
**Language**: German-only (de-CH)  
**Currency**: CHF  
**Shipping**: Free CH/LI  

---

## ✅ Completed Tasks

### Phase A: Config Validation & Single Source of Truth
- **`src/config/company.ts`**: Complete `CompanyConfig` interface with all required fields
- **Build-time validation** (`scripts/validate-config.ts`): Logs warnings, exits 0 (non-blocking)
- **`MISSING_INFO.md`**: Root-level tracking document for all missing client data
- Added `vatExempt` boolean field for TVA exemption handling
- Added `socialLinks` and `authorizedBrands` arrays for JSON-LD

### Phase B: German URLs & Routes
All internal links unified to German slugs:
- `/produkte` (products)
- `/kategorie/stadt|trekking|mountainbike|zubehoer|bekleidung|kinder` (categories)
- `/warenkorb` (cart)
- `/wunschliste` (wishlist)
- `/kontakt` (contact)
- `/ueber-uns` (about)
- `/anmelden` (login)
- `/konto` (account)

**Middleware 301 redirects** implemented for legacy URLs:
- `/panier`, `/cart` → `/warenkorb`
- `/connexion`, `/login` → `/anmelden`
- `/compte` → `/konto`
- `/a-propos`, `/about` → `/ueber-uns`
- `/contact` → `/kontakt`
- `/products`, `/shop` → `/produkte`
- `/categorie/ville|vtc|vtt|enfants|vetements|accessoires` → German equivalents
- `/legal/agb|shipping-returns|privacy-policy|cookie-policy` → German equivalents
- `/wishlist` → `/wunschliste`
- www/https enforcement in production
- Security headers (HSTS, CSP, X-Frame-Options, etc.)

### Phase C: Honest JSON-LD (No Fake Data)
- **Product JSON-LD** (`src/app/produkt/[id]/page.tsx`):
  - `name`, `description`, `image`, `sku`, `brand`
  - `offers`: `price`, `priceCurrency: "CHF"`, `availability`, `url`, `itemCondition`
  - `shippingDetails`: Free shipping CH/LI with delivery time
  - `hasMerchantReturnPolicy`: Uses config values
  - **No `gtin`/`mpn` if empty** (conditional)
  - **No `aggregateRating`** unless `rating`, `reviewsCount` AND `reviewsVerified=true`
- **BreadcrumbList JSON-LD**: Products (4 levels) + Categories (3 levels)
- **Organization JSON-LD** (layout.tsx): Conditional `address` and `sameAs` only when config filled
- **Open Graph**: `og:type="product"` on product pages, `website` elsewhere

### Phase D: Price & Review Handling
- **Price display** (strikethrough, %, "Sie sparen", ANGEBOT badge) **only when**:
  - `compareAtPrice` exists AND `priceVerified=true`
- **Reviews/Stars** hidden behind `reviewsVerified` flag (default: false)
- Applied across: `ProductCard`, `BestSellers`, `ProductDetailActions`, `Poele`, `SearchBar`, product detail page
- Database schema extended: `compareAtPrice`, `priceVerified`, `reviewsVerified`, GMC fields
- Delivery time from `c.deliveryTimeText` (config) instead of hardcoded

### Phase E: Product Field Preparation for GMC
Extended product interface with GMC-required fields:
- `gtin`, `mpn`, `condition`, `availability`, `googleProductCategory`
- `color`, `size`, `gender`, `ageGroup` (apparel/kids)
- **GMC Feed** (`/feed/google-merchant.xml`): RSS 2.0 + g:ns
  - Excludes products missing GTIN/MPN/brand/condition/availability/googleProductCategory
  - Logs exclusions to console.warn

### Phase F: Legal Pages Without Invention
All 5 legal pages migrated to **homepage metadata model**:
- Canonical URLs via `alternates.canonical`
- Full Open Graph (title, description, url, image, siteName, type, locale)
- Twitter cards
- German routes: `/legal/impressum`, `/legal/terms`, `/legal/privacy`, `/legal/cookies`, `/legal/versand-retouren`
- **No "Entwurf" banners**, **no `[...À REMPLIR...]` placeholders**
- **Conditional rendering**: Sections/champ show only when config values exist
- **Cookies page**: Removed `velora_admin_session` (not public), `swissholz_cart` (legacy)
- GA/Meta/Stripe listed only if actually loaded via Consent Mode v2

**Impressum specific**:
- "Anbieter" section only if `legalName`, `street`, `postalCode`, `city` all filled
- VAT display: shows `vatNumber` if set, "Nicht mehrwertsteuerpflichtig (Kleinunternehmer / OSS)" if `vatExempt=true`, else "Nicht mehrwertsteuerpflichtig"
- Removed EU OS platform link (not applicable for CH-only shop)
- Removed supervisory authority section (not regulated)

### Phase G: Quality Checks
- ✅ Build passes (`npm run build`) — 97 routes, TypeScript clean
- ✅ No double slashes in canonical/og URLs (fixed `getSiteUrl()`)
- ✅ Dynamic `sitemap.xml` with hreflang `de-CH` + `x-default`
- ✅ Dynamic `robots.txt` with Sitemap reference
- ✅ `<html lang="de-CH">` in layout
- ✅ Custom 404 page (`/not-found.tsx`) in German
- ✅ Duplicate title fix: Individual pages use bare titles (`"Kontakt"`, `"Über uns"`, `"Alle Produkte"`), layout template appends `| VELORA`
- ✅ "Über VELORA" → `/ueber-uns` (redirect in middleware)
- ✅ Price display consistent across all components (strikethrough, %, savings, badge only when `compareAtPrice && priceVerified`)
- ✅ Product JSON-LD: `og:type="product"`, no aggregateRating without verified reviews
- ✅ "Schweizer Onlineshop"/"Schweizer E-Bike Shop" removed from metadata until `company.country` AND `company.uid` filled
- ✅ Carrier/delay read from `company.ts` (`c.shippingCarrier`, `c.deliveryTimeText`)

---

## ⚠️ Client Action Required (from MISSING_INFO.md)

### Required Config Fields (❌ MANQUANT)
| Field | Description |
|-------|-------------|
| `legalName` | Raison sociale complète (ex: "VELORA AG") |
| `legalForm` | Forme juridique (ex: "Aktiengesellschaft", "GmbH", "Einzelfirma") |
| `street` | Rue et numéro |
| `postalCode` | Code postal |
| `city` | Ville |
| `uid` | Numéro IDE (format: CHE-XXX.XXX.XXX) |
| `commercialRegister` | Registre du commerce |
| `responsiblePerson` | Nom du responsable légal (ex: "Max Muster, CEO") |

### Recommended Updates
- `vatExempt`: Set `true` if non-assujetti (Kleinunternehmer/OSS)
- `authorizedDealer`: Set `true` if official dealer for CUBE/Benno/O2feel/Granville
- `paymentProviders`: Add `"Stripe (Karte, TWINT)"` after integration
- `socialLinks`: Add Instagram/Facebook URLs for JSON-LD `sameAs`
- Email: Confirm `kontact@` vs `kontakt@` (currently `kontact@veloras.ch`)

### Database Migration
```bash
npx tsx scripts/migrate-products.ts
```
Then add GTIN/MPN/brand/condition/availability/googleProductCategory per product in admin.

### Vercel Environment Variables
| Variable | Status |
|----------|--------|
| `TURSO_DATABASE_URL` | ✅ Required |
| `TURSO_AUTH_TOKEN` | ✅ Required |
| `NEXT_PUBLIC_SITE_URL` | ✅ `https://www.veloras.ch` |
| `SMTP_*` | ✅ Required for contact form |
| `NEXT_PUBLIC_GA_ID` | ⏳ For Consent Mode v2 |
| `NEXT_PUBLIC_GTM_ID` | ⏳ For Consent Mode v2 |
| `STRIPE_*` | ⏳ After payment integration |

---

## 🧪 Pre-Launch Tests
| Test | Command/Tool | Success Criteria |
|------|--------------|------------------|
| Build | `npm run build` | ✅ 97 routes, no errors |
| Lint | `npm run lint` | ✅ Clean |
| 301 Redirects | `curl -I https://veloras.ch/products` | `301 → https://www.veloras.ch/produkte` |
| Canonical URLs | View source each page | Clean URL per page |
| Product JSON-LD | [Rich Results Test](https://search.google.com/test/rich-results) | ✅ Valid |
| Organization JSON-LD | [Rich Results Test](https://search.google.com/test/rich-results) | ✅ Valid |
| Sitemap.xml | `GET /sitemap.xml` | ✅ 200, all URLs, hreflang |
| Robots.txt | `GET /robots.txt` | ✅ 200, contains Sitemap |
| GMC Feed | `GET /feed/google-merchant.xml` | ✅ 200, valid RSS 2.0 + g:ns |
| 404 Page | Visit `/page-inexistante` | ✅ German custom page |
| Consent Mode v2 | DevTools → Cookies | Scripts blocked without consent |
| localStorage migration | DevTools → localStorage | `velora_cart` present, `swissholz_cart` absent |

---

## 📝 Notes
- Build warnings from config validation are **intentional** (exit 0) — they inform without blocking CI/CD
- All "Swiss" branding in metadata is conditional on `country` + `uid` being filled
- No visitor-facing brackets, placeholders, or "Entwurf" banners remain
- No breaking changes to existing functionality
- Single source of truth: `src/config/company.ts` for all company data
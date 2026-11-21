# VELORA – Fehlende Informationen (Stand: 2026-11-21)

> Alle unten aufgeführten Werte müssen in **`src/config/company.ts`** eingetragen werden, damit die entsprechenden Inhalte auf der Website erscheinen. **Kein Wert wird hardcoded – alles kommt aus der Config.**

---

## 🔴 Kritisch: Pflichtfelder für Google Merchant Center & Rechtssicherheit

| Feld in `company.ts` | Beschreibung | Status |
|---|---|---|
| `legalName` | Vollständige Firmenbezeichnung (z. B. „VELORA AG“) | ❌ FEHLT |
| `legalForm` | Rechtsform (z. B. „Aktiengesellschaft“, „GmbH“, „Einzelfirma“) | ❌ FEHLT |
| `street` | Straße & Hausnummer | ❌ FEHLT |
| `postalCode` | PLZ | ❌ FEHLT |
| `city` | Ort | ❌ FEHLT |
| `uid` | UID / IDE (Format: `CHE-XXX.XXX.XXX`) | ❌ FEHLT |
| `commercialRegister` | Handelsregistereintrag (z. B. „Handelsregister des Kantons Zürich, CH-123.4.567.890-1“) | ❌ FEHLT |
| `responsiblePerson` | Vertretungsberechtigte Person (z. B. „Max Muster, CEO“) | ❌ FEHLT |

---

## 🟡 Wichtig: Rechtliche & operative Angaben

| Feld in `company.ts` | Beschreibung | Aktueller Wert / Status |
|---|---|---|
| `vatNumber` | MWST-Nummer (z. B. „CHE-XXX.XXX.XXX MWST“) oder `null` | `null` (⚠️ Prüfen: MWST-pflichtig?) |
| `vatExempt` | `true` wenn nicht MWST-pflichtig (Kleinunternehmer, OSS), `null` = ungeklärt | `null` ❌ FEHLT |
| `authorizedDealer` | `true` wenn offizieller Fachhändler für CUBE/Benno/O2feel/Granville | `false` ⚠️ Prüfen |
| `authorizedBrands` | Array der Marken, für die man offizieller Händler ist | `["CUBE", "Benno Bikes", "O2FEEL", "Granville"]` (Platzhalter) |
| `paymentProviders` | Zahlungsarten (z. B. `["Banküberweisung", "Stripe (Karte, TWINT)"]`) | `["Banküberweisung"]` |
| `paymentDeadlineDays` | Zahlungsfrist bei Vorkasse (Tage) | `10` ✓ |
| `deliveryTimeText` | Lieferzeit-Text (z. B. „2 bis 4 Werktage“) | `2 bis 4 Werktage` ✓ |
| `shippingCarrier` | Versanddienstleister (z. B. „Planzer, DPD Schweiz, Poste Suisse“) | `Planzer / DPD Schweiz / Poste Suisse` ✓ |

---

## 🟢 Rückgabe & Garantie (nur sichtbar wenn `returnPolicyAccepted: true`)

| Feld in `company.ts` | Beschreibung | Aktueller Wert |
|---|---|---|
| `returnPolicyAccepted` | **Master-Switch**: `true` = Widerrufstexte werden angezeigt | `false` ❌ FEHLT |
| `returnPeriodDays` | Widerrufsfrist in Tagen | `14` ✓ |
| `returnShippingCostPolicy` | Wer trägt Rücksendekosten? | Platzhalter-Text ✓ |
| `returnRefundDurationDays` | Rückerstattungsfrist in Tagen | `14` ✓ |
| `warrantyText` | Garantietext (Herstellergarantie) | Platzhalter-Text ✓ |
| `damageReportDays` | Frist für Transportschaden-Meldung (Werktage) | `2` ✓ |

---

## 🔵 Datenschutz – Aufbewahrungsfristen (nur sichtbar wenn befüllt)

| Feld in `company.ts` | Beschreibung | Aktueller Wert |
|---|---|---|
| `dataRetentionAccountDays` | Konto-Daten nach Löschung (Tage) | `30` ✓ |
| `dataRetentionOrderYears` | Bestelldaten (Jahre, Art. 958a OR) | `10` ✓ |
| `dataRetentionInvoiceYears` | Rechnungen (Jahre, Art. 958a OR) | `10` ✓ |
| `dataRetentionContactYears` | Kontaktanfragen (Jahre) | `2` ✓ |
| `dataRetentionLogsDays` | Technische Logs (Tage) | `90` ✓ |

---

## 🔵 Datenschutz – Behörden & Plattformen

| Feld in `company.ts` | Beschreibung | Aktueller Wert |
|---|---|---|
| `privacyAuthority` | Aufsichtsbehörde (Standard: EDÖB) | Platzhalter ✓ |
| `supervisoryAuthority` | Branchenspezifische Aufsichtsbehörde (optional) | ❌ FEHLT |
| `osPlatformUrl` | OS-Streitschlichtungsplattform URL (optional) | ❌ FEHLT |

---

## 🔵 Kontakt & Öffnungszeiten

| Feld in `company.ts` | Beschreibung | Aktueller Wert |
|---|---|---|
| `email` | Haupt-E-Mail | `kontact@veloras.ch` ✓ |
| `privacyEmail` | Datenschutz-E-Mail (kann = email) | `kontact@veloras.ch` ✓ |
| `phone` | Telefon (Anzeigeformat) | `+41 76 752 94 93` ✓ |
| `phoneRaw` | Telefon (tel:-Format) | `+41767529493` ✓ |
| `openingHours` | Öffnungszeiten (Beratung) | Platzhalter ✓ |

---

## 🔵 Marke & Social

| Feld in `company.ts` | Beschreibung | Aktueller Wert |
|---|---|---|
| `brandName` | Markenname (Display) | `VELORA` ✓ |
| `siteUrl` | Kanonische URL | `https://www.veloras.ch` ✓ |
| `socialLinks` | Social-Media-URLs für JSON-LD `sameAs` | `[]` ❌ FEHLT |

---

## 📋 Zusammenfassung: Was fehlt für „Go-Live“?

**Minimal (rechtlich nötig):**
1. `legalName`, `legalForm`, `street`, `postalCode`, `city`
2. `uid`, `commercialRegister`, `responsiblePerson`
3. `vatExempt` (true/false klären)
4. `returnPolicyAccepted: true` (nach juristischer Prüfung)
5. `authorizedDealer` + `authorizedBrands` korrekt setzen
6. `paymentProviders` um Stripe erweitern sobald integriert

**Optional (SEO/Vertrauen):**
7. `socialLinks` befüllen
8. `supervisoryAuthority` falls branchenspezifisch reguliert
9. `osPlatformUrl` falls OS-Plattform relevant

---

## 🗑️ Entfernte Inhalte (weil nicht in company.ts)

Die folgenden Texte/Blöcke wurden **komplett entfernt**, weil sie keine Entsprechung in `company.ts` haben:

### `/ueber-uns`
- ❌ „14 Tage Widerrufsrecht“ (Feature-Card) → nur wenn `returnPolicyAccepted && returnPeriodDays`
- ❌ „Einfache Retouren“ (Feature-Card) → nur wenn `returnPolicyAccepted`
- ❌ „Banküberweisung & Stripe (geplant)“ (Feature-Card) → nur wenn `paymentProviders` befüllt
- ❌ „Schweizer Onlineshop“ / „gegründet…“ (Marketing-Floskeln)
- ❌ „Adresse wird ergänzt“ (Platzhalter-Text) → Adresse nur wenn `street/postalCode/city` befüllt
- ❌ „Sicherer Kauf“ Block → nur wenn Zahlungsarten in Config
- ❌ „Retouren“ Block → nur wenn Rückgabepolitik akzeptiert

### `/legal/versand-retouren`
- ❌ Harter Text „Herstellergarantie gemäß OR. 2 Jahre… Batterien ausgenommen“ → nur `warrantyText` aus Config
- ❌ „Ausschluss des Widerrufsrechts“ → **nur** wenn `returnPolicyAccepted: true`
- ❌ Harter Lieferzeit-Text „2 bis 4 Werktage“ → `deliveryTimeText` aus Config
- ❌ Harter Zahlungsfrist-Text „10 Tage“ → `paymentDeadlineDays` aus Config
- ❌ Harter Schadenmelde-Text „2 Werktage“ → `damageReportDays` aus Config

### `/legal/privacy`
- ❌ Cloudflare, WhatsApp, Stripe/TWINT (wenn nicht in Config), Google Analytics, Dependabot, npm audit
- ❌ Harte Speicherdauern (10 Jahre, 2 Jahre, 30 Tage, 90 Tage) → nur wenn entsprechende `dataRetention*` Felder befüllt
- ❌ „mail.www.veloras.ch“ (Platzhalter) → nur generisch „SMTP-Provider (via Env)“
- ❌ Dopplung EDÖB (zweimal aufgeführt) → einmal
- ❌ „Verantwortliche Stelle“ → nur wenn `legalName` befüllt

### `/legal/terms`
- ❌ 15 harte Sections (Vertragsschluss-Schritte, Teillieferungen, Eigentumsvorbehalt, Haftung, Salvatorische Klausel, Stand/Änderungen, etc.) → **nur** Sections rendern, deren Daten in Config existieren
- ❌ Keine Meta-Keywords, keine Draft-Banner, keine Platzhalter in Klammern

### `/legal/cookies`
- ❌ Stripe-Cookies → nur wenn `paymentProviders` „Stripe“ enthält
- ❌ Alle `→` Pfeile in Browser-Anleitungen durch `&rarr;` ersetzt (JSX-konform)

### Navbar / Top-Bar
- ❌ Fester Text „Kostenloser Versand“ / „2 bis 4 Werktage / Versand via…“ → dynamisch aus `deliveryTimeText` / `shippingCarrier`
- ❌ Fallback: nur „Kostenlose Lieferung Schweiz & Liechtenstein“ wenn beide leer

### Redirects (301 permanent)
- `/a-propos` → `/ueber-uns`
- `/contact` → `/kontakt`
- `/products` → `/produkte`
- `/panier` → `/warenkorb`
- `/cart` → `/warenkorb`
- `/connexion` → `/anmelden`
- `/wishlist` → `/wunschliste`
- `/categorie/*` → `/kategorie/*` (via generateStaticParams)

### Schreibweise de-CH
- ❌ Alle `ß` → `ss` ersetzt (Strasse, Masse, Weiss, Schliessen, abschliessen, geniessen, gesso, etc.)

---

## ✅ Build-Status

```
✓ Compiled successfully
✓ Generating static pages (97/97)
✓ Sitemap.xml generiert (inkl. Produkt-URLs)
✓ Robots.txt generiert
✓ 404-Seite vorhanden
✓ Alle Rechtsseiten rendern nur bei befüllter Config
```

---

> **Nächster Schritt:** `src/config.company.ts` mit echten Kundendaten befüllen → alle Inhalte erscheinen automatisch.
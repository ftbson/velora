// lib/schema.ts
import {
  index,
  integer,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [uniqueIndex("users_email_unique").on(table.email)],
);

export const authSessions = sqliteTable(
  "auth_sessions",
  {
    tokenHash: text("token_hash").primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    role: text("role").notNull(),
    expiresAt: text("expires_at").notNull(),
    createdAt: text("created_at").notNull(),
  },
  (table) => [
    index("auth_sessions_user_id_idx").on(table.userId),
    index("auth_sessions_expires_at_idx").on(table.expiresAt),
  ],
);

export const authAttempts = sqliteTable(
  "auth_attempts",
  {
    id: text("id").primaryKey(),
    action: text("action").notNull(),
    identifierHash: text("identifier_hash").notNull(),
    attemptedAt: text("attempted_at").notNull(),
  },
  (table) => [
    index("auth_attempts_lookup_idx").on(
      table.action,
      table.identifierHash,
      table.attemptedAt,
    ),
  ],
);

// ==========================================
// PRODUITS - Extension pour Google Merchant Center
// ==========================================
export const products = sqliteTable(
  "products",
  {
    id: text("id").primaryKey(), // ex: "city-cube-supreme-pro"
    title: text("title").notNull(),
    brand: text("brand").notNull(),
    category: text("category").notNull(), // VILLE, VTC, VTT, ACCESSOIRES, VETEMENTS, ENFANTS
    categoryLabel: text("category_label").notNull(), // CITY E-BIKE, TREKKING E-BIKE, etc.

    // Prix
    price: real("price").notNull(), // Prix actuel en CHF
    compareAtPrice: real("compare_at_price"), // Ancien prix barré
    priceVerified: integer("price_verified", { mode: "boolean" }).default(false), // Prix comparatif vérifié

    // Identifiants produit (Google Merchant Center)
    gtin: text("gtin"), // EAN/GTIN (ex: 7640123456789)
    mpn: text("mpn"), // Manufacturer Part Number
    googleProductCategory: text("google_product_category"), // GMC category ID
    productType: text("product_type"), // Custom product type

    // Disponibilité & État
    availability: text("availability", { enum: ["in_stock", "out_of_stock", "preorder", "limited"] }).default("in_stock"),
    condition: text("condition", { enum: ["new", "refurbished", "used"] }).default("new"),
    stockQuantity: integer("stock_quantity").default(0),

    // Images
    image: text("image").notNull(), // Image principale
    additionalImages: text("additional_images", { mode: "json" }).$type<string[]>().default([]), // Images supplémentaires

    // Attributs vêtements (Google Merchant Center)
    color: text("color"),
    size: text("size"),
    gender: text("gender", { enum: ["male", "female", "unisex", "kids"] }),
    ageGroup: text("age_group", { enum: ["newborn", "infant", "toddler", "kids", "adult"] }),

    // Spécifications techniques (vélos)
    motorTorque: text("motor_torque"),
    batteryCapacity: text("battery_capacity"),
    specsFrame: text("specs_frame"),
    specsBrakes: text("specs_brakes"),
    specsRange: text("specs_range"),
    specsWeight: text("specs_weight"),

    // Détails génériques (JSON)
    details: text("details", { mode: "json" }).$type<{ label: string; value: string }[]>(),

    // Marketing
    badgePromo: integer("badge_promo", { mode: "boolean" }).default(false),
    discount: text("discount"), // ex: "-21 %"
    savings: real("savings"),
    isNew: integer("is_new", { mode: "boolean" }).default(false),
    isDraft: integer("is_draft", { mode: "boolean" }).default(false),
    rating: real("rating"),
    reviewsCount: integer("reviews_count"),
    reviewsVerified: integer("reviews_verified", { mode: "boolean" }).default(false),

    // Description
    description: text("description").notNull(),

    // Timestamps
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [
    index("products_category_idx").on(table.category),
    index("products_brand_idx").on(table.brand),
    index("products_availability_idx").on(table.availability),
    index("products_is_draft_idx").on(table.isDraft),
    index("products_price_idx").on(table.price),
  ],
);

// Table des commandes (Orders)
export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(), // Ex: ORD-2026-11-13-4821
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  country: text("country").notNull(),
  streetAddress: text("street_address").notNull(),
  whatsapp: text("whatsapp").notNull(),
  email: text("email").notNull(),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  subtotal: real("subtotal").notNull(),
  shippingCost: real("shipping_cost").notNull(),
  grandTotal: real("grand_total").notNull(),
  status: text("status", { enum: ["pending", "paid", "shipped", "cancelled", "refunded"] }).default("pending"),
  paymentMethod: text("payment_method"), // "bank_transfer", "stripe", "twint"
  paymentReference: text("payment_reference"), // Transaction ID Stripe, etc.
  paidAt: text("paid_at"),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
});

export const orderItems = sqliteTable(
  "order_items",
  {
    id: text("id").primaryKey(),
    orderId: text("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: text("product_id").notNull(),
    title: text("title").notNull(),
    category: text("category").notNull(),
    quantity: integer("quantity").notNull(),
    unitPrice: real("unit_price").notNull(),
  },
  (table) => [
    uniqueIndex("order_items_order_product_unique").on(
      table.orderId,
      table.productId,
    ),
    index("order_items_order_id_idx").on(table.orderId),
  ],
);

export const bankDetails = sqliteTable("bank_details", {
  id: text("id").primaryKey(),
  beneficiary: text("beneficiary").notNull(),
  iban: text("iban").notNull(),
  bic: text("bic").notNull(),
  address: text("address"),
  updatedAt: text("updated_at").notNull(),
});

// ==========================================
// AVIS CLIENTS (pour aggregateRating vérifié)
// ==========================================
export const reviews = sqliteTable(
  "reviews",
  {
    id: text("id").primaryKey(),
    productId: text("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .references(() => users.id, { onDelete: "set null" }),
    orderId: text("order_id")
      .references(() => orders.id, { onDelete: "set null" }),
    rating: integer("rating").notNull(), // 1-5
    title: text("title"),
    content: text("content"),
    isVerifiedPurchase: integer("is_verified_purchase", { mode: "boolean" }).default(false),
    isPublished: integer("is_published", { mode: "boolean" }).default(false),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [
    index("reviews_product_id_idx").on(table.productId),
    index("reviews_user_id_idx").on(table.userId),
    index("reviews_published_idx").on(table.isPublished),
  ],
);
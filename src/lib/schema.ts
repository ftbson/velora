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

// Table des commandes (Orders)
export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(), // Ex: ORD-17123456789
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
  status: text("status").default("pending"), // pending, paid, shipped, cancelled
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
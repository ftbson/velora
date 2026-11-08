// lib/schema.ts
import { sqliteTable, text, real } from "drizzle-orm/sqlite-core";

// Table des commandes (Orders)
export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(), // Ex: ORD-17123456789
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  country: text("country").notNull(),
  streetAddress: text("street_address").notNull(),
  whatsapp: text("whatsapp").notNull(),
  email: text("email").notNull(),
  subtotal: real("subtotal").notNull(),
  shippingCost: real("shipping_cost").notNull(),
  grandTotal: real("grand_total").notNull(),
  status: text("status").default("pending"), // pending, paid, shipped, cancelled
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
});

export const bankDetails = sqliteTable("bank_details", {
  id: text("id").primaryKey(),
  beneficiary: text("beneficiary").notNull(),
  iban: text("iban").notNull(),
  bic: text("bic").notNull(),
  address: text("address"),
  updatedAt: text("updated_at").notNull(),
});
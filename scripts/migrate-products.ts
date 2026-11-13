#!/usr/bin/env tsx
/**
 * Script de migration pour ajouter les nouveaux champs produits
 * à la base de données Turso (SQLite)
 *
 * À exécuter après avoir mis à jour schema.ts :
 * npx tsx scripts/migrate-products.ts
 */

import { createClient } from "@libsql/client";
import { productsData } from "../src/data/products";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN || "",
});

const MIGRATION_STATEMENTS = [
  // ==========================================
  // NOUVELLE TABLE PRODUCTS (remplace data/products.ts statique)
  // ==========================================
  `CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    brand TEXT NOT NULL,
    category TEXT NOT NULL,
    category_label TEXT NOT NULL,
    price REAL NOT NULL,
    compare_at_price REAL,
    price_verified INTEGER DEFAULT 0,
    gtin TEXT,
    mpn TEXT,
    availability TEXT DEFAULT 'in_stock' CHECK (availability IN ('in_stock', 'out_of_stock', 'preorder', 'limited')),
    condition TEXT DEFAULT 'new' CHECK (condition IN ('new', 'refurbished', 'used')),
    stock_quantity INTEGER DEFAULT 0,
    image TEXT NOT NULL,
    additional_images TEXT DEFAULT '[]',
    color TEXT,
    size TEXT,
    gender TEXT CHECK (gender IN ('male', 'female', 'unisex', 'kids')),
    age_group TEXT CHECK (age_group IN ('newborn', 'infant', 'toddler', 'kids', 'adult')),
    motor_torque TEXT,
    battery_capacity TEXT,
    specs_frame TEXT,
    specs_brakes TEXT,
    specs_range TEXT,
    specs_weight TEXT,
    details TEXT DEFAULT '[]',
    badge_promo INTEGER DEFAULT 0,
    discount TEXT,
    savings REAL,
    is_new INTEGER DEFAULT 0,
    is_draft INTEGER DEFAULT 0,
    rating REAL,
    reviews_count INTEGER,
    reviews_verified INTEGER DEFAULT 0,
    description TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,

  // Index pour performance
  "CREATE INDEX IF NOT EXISTS products_category_idx ON products(category)",
  "CREATE INDEX IF NOT EXISTS products_brand_idx ON products(brand)",
  "CREATE INDEX IF NOT EXISTS products_availability_idx ON products(availability)",
  "CREATE INDEX IF NOT EXISTS products_is_draft_idx ON products(is_draft)",
  "CREATE INDEX IF NOT EXISTS products_price_idx ON products(price)",

  // ==========================================
  // TABLE REVIEWS pour aggregateRating vérifié
  // ==========================================
  `CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY NOT NULL,
    product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    order_id TEXT REFERENCES orders(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title TEXT,
    content TEXT,
    is_verified_purchase INTEGER DEFAULT 0,
    is_published INTEGER DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,

  "CREATE INDEX IF NOT EXISTS reviews_product_id_idx ON reviews(product_id)",
  "CREATE INDEX IF NOT EXISTS reviews_user_id_idx ON reviews(user_id)",
  "CREATE INDEX IF NOT EXISTS reviews_published_idx ON reviews(is_published)",

  // ==========================================
  // EXTENSION TABLE ORDERS
  // ==========================================
  // Ajout colonnes si absentes (SQLite ne supporte pas IF NOT EXISTS pour ALTER TABLE ADD COLUMN)
  // On utilise une approche try-catch
];

async function runMigration() {
  console.log("🚀 Starting database migration...\n");

  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    console.error("❌ TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set in environment");
    process.exit(1);
  }

  // 1. Create tables
  for (const statement of MIGRATION_STATEMENTS) {
    try {
      await client.execute(statement);
      console.log(`✅ Executed: ${statement.substring(0, 60)}...`);
    } catch (error: any) {
      if (error.message?.includes("already exists") || error.message?.includes("duplicate column")) {
        console.log(`⏭️  Skipped (already exists): ${statement.substring(0, 60)}...`);
      } else {
        console.error(`❌ Error: ${error.message}`);
        console.error(`   Statement: ${statement}`);
      }
    }
  }

  // 2. Add columns to orders table if missing
  const orderColumns = [
    { name: "payment_method", type: "TEXT" },
    { name: "payment_reference", type: "TEXT" },
    { name: "paid_at", type: "TEXT" },
  ];

  for (const col of orderColumns) {
    try {
      await client.execute(`ALTER TABLE orders ADD COLUMN ${col.name} ${col.type}`);
      console.log(`✅ Added column orders.${col.name}`);
    } catch (error: any) {
      if (error.message?.includes("duplicate column")) {
        console.log(`⏭️  Column orders.${col.name} already exists`);
      } else {
        console.error(`❌ Error adding orders.${col.name}: ${error.message}`);
      }
    }
  }

  // 3. Check if products table is empty, if so seed with current data
  const countResult = await client.execute("SELECT COUNT(*) as count FROM products");
  const productCount = Number(countResult.rows[0]?.count || 0);

  if (productCount === 0) {
    console.log("\n📦 Products table empty, seeding with current catalog data...");
    await seedProducts();
  } else {
    console.log(`\n📦 Products table already has ${productCount} products. Skipping seed.`);
    console.log("   To re-seed, clear the table first or run the seed script separately.");
  }

  console.log("\n✅ Migration completed successfully!");
  console.log("\n📋 Next steps:");
  console.log("   1. Update src/lib/db.ts to use the new schema");
  console.log("   2. Update product pages to fetch from database instead of data/products.ts");
  console.log("   3. Add GTIN/MPN/stock data for each product in admin");
  console.log("   4. For apparel: add color, size, gender, age_group");
  console.log("   5. For kids bikes: add age_group");
}

async function seedProducts() {
  const now = new Date().toISOString();

  for (const product of productsData) {
    // Skip draft products in production seed
    if (product.isDraft) continue;

    const specs = (product.specs || {}) as Record<string, string | null>;
    const details = product.details || [];

    const stmt = `
      INSERT INTO products (
        id, title, brand, category, category_label, price, compare_at_price, price_verified,
        gtin, mpn, availability, condition, stock_quantity, image, additional_images,
        color, size, gender, age_group,
        motor_torque, battery_capacity,
        specs_frame, specs_brakes, specs_range, specs_weight,
        details, badge_promo, discount, savings, is_new, is_draft,
        rating, reviews_count, reviews_verified, description,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      product.id,
      product.title,
      product.brand,
      product.category,
      product.categoryLabel,
      product.price,
      product.oldPrice || null,
      product.oldPrice && (product as any).price_verified ? 1 : 0,
      (product as any).gtin || null,
      (product as any).mpn || null,
      (product as any).availability || "in_stock",
      (product as any).condition || "new",
      (product as any).stockQuantity || 10,
      product.image,
      JSON.stringify((product as any).additionalImages || []),
      (product as any).color || null,
      (product as any).size || null,
      (product as any).gender || null,
      (product as any).age_group || null,
      product.motorTorque || null,
      product.batteryCapacity || null,
      specs.frame || null,
      specs.brakes || null,
      specs.range || null,
      specs.weight || null,
      JSON.stringify(details),
      product.badgePromo ? 1 : 0,
      product.discount || null,
      product.savings || null,
      product.isNew ? 1 : 0,
      product.isDraft ? 1 : 0,
      product.rating || null,
      product.reviewsCount || null,
      0, // reviews_verified = false (no verified review system yet)
      product.description,
      now,
      now,
    ];

    try {
      await client.execute({ sql: stmt, args: values });
      console.log(`   ✅ Seeded: ${product.title}`);
    } catch (error: any) {
      console.error(`   ❌ Failed to seed ${product.title}: ${error.message}`);
    }
  }
}

runMigration().catch(console.error);
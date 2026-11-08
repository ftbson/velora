PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON users(email);

CREATE TABLE IF NOT EXISTS auth_sessions (
  token_hash TEXT PRIMARY KEY NOT NULL,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('customer', 'admin')),
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  CHECK ((role = 'admin' AND user_id IS NULL) OR (role = 'customer' AND user_id IS NOT NULL))
);
CREATE INDEX IF NOT EXISTS auth_sessions_user_id_idx ON auth_sessions(user_id);
CREATE INDEX IF NOT EXISTS auth_sessions_expires_at_idx ON auth_sessions(expires_at);

CREATE TABLE IF NOT EXISTS auth_attempts (
  id TEXT PRIMARY KEY NOT NULL,
  action TEXT NOT NULL,
  identifier_hash TEXT NOT NULL,
  attempted_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS auth_attempts_lookup_idx
  ON auth_attempts(action, identifier_hash, attempted_at);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  country TEXT NOT NULL,
  street_address TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  subtotal REAL NOT NULL,
  shipping_cost REAL NOT NULL,
  grand_total REAL NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TEXT
);
CREATE INDEX IF NOT EXISTS orders_user_id_created_at_idx
  ON orders(user_id, created_at);

CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY NOT NULL,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price REAL NOT NULL CHECK (unit_price >= 0)
);
CREATE UNIQUE INDEX IF NOT EXISTS order_items_order_product_unique
  ON order_items(order_id, product_id);
CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON order_items(order_id);

CREATE TABLE IF NOT EXISTS bank_details (
  id TEXT PRIMARY KEY NOT NULL,
  beneficiary TEXT NOT NULL,
  iban TEXT NOT NULL,
  bic TEXT NOT NULL,
  address TEXT,
  updated_at TEXT NOT NULL
);

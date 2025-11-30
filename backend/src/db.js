import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'password',
  database: process.env.DB_NAME || 'taskflow',
  port: 5432
});

// Test connection immediately
pool.connect()
  .then(() => console.log("✅ Postgres connected successfully"))
  .catch(err => console.error("❌ DB connection error:", err));

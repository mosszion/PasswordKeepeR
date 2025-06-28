// PG database client/connection setup
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

// Use DATABASE_URL if available (e.g., in Render) or fallback to individual vars
const pool = new Pool(
  isProduction && process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
      }
);

pool.connect()
  .then(() => console.log("✅ Connected to the database"))
  .catch(err => console.error("❌ Database connection error:", err));

module.exports = pool;

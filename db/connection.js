// PG database client/connection setup
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "passwordkeepr",
  port: 5432,
});

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });

pool.connect();

module.exports = pool;

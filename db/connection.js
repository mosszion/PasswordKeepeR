// PG database client/connection setup
const { Pool } = require('pg');

// const dbParams = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// };

// const dbParams = new Pool({
//   user: "labber",
//   password: "labber",
//   host: "localhost",
//   database: "passwordkeepr",
// });

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "passwordkeepr",
});

pool.connect();

// module.exports = db;

module.exports = pool;


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

// db.connect();

/// Users

/**
 * Get a single user from the database given their email.
 */
const getUserWithEmail = function(email) {
  return pool
  .query(`SELECT * FROM users WHERE email = $1`, [email])
  .then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.error("Error fetching user:", err.message); 
    throw err; 
  });
};

// module.exports = db;

module.exports = {
  getUserWithEmail
};


// const pool = require('../connection');

// /**
//  * Get a single user from the database given their email.
//  */
// const addUserToDatabase = function(email) {
//   const queryString = `
//   SELECT * FROM users WHERE email = $1
//   `
//   return pool
//   .query(queryString, [email])
//   .then((result) => {
//     console.log(result.rows[0]);
//     return result.rows[0];
//   })
//   .catch((err) => {
//     console.error("Error adding :", err.message); 
//     throw err; 
//   });
// };

// module.exports = {
//   addUserToDatabase
// };
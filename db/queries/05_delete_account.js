const pool = require('../connection');

// /**
//  * Add an account to the accounts table.
//  */
const deleteAccountFromDB = function(accountID) {
  const queryString = `
  DELETE FROM accounts
  WHERE id = $1
  RETURNING *
  `;

  return pool
  .query(queryString, [accountID])
  .then((result) => {
    // console.log("Deleted account:", result.rows);
    return result.rows[0];
  })
  .catch((err) => {
    console.error("Error deleting account:", err.message); 
    throw err; 
  });
};

// const deleteAccountFromDB = function(accountID, adminID) {
//   const queryString = `
//   SELECT * FROM accounts
//   JOIN organizations ON organizations.id = accounts.organization_id
//   WHERE accounts.id = $1
//   AND organizations.admin_id = $2
//   RETURNING *`;

//   return pool
//     .query(queryString, [accountID, adminID])
//     .then((result) => {
//       console.log("Deleted account:", result.rows);
//       return result.rows[0];
//     })
//     .catch((err) => {
//       console.error("Error deleting account:", err.message); 
//       throw err; 
//     });
// };

module.exports = {
  deleteAccountFromDB
};
const pool = require('../connection');

// /**
//  * Add an account to the accounts table.
//  */
const deleteAccountFromDB = function(accountID) {
  const queryString = `
  DELETE FROM accounts
  WHERE id = $1
  RETURNING *`;

  return pool
  .query(queryString, [accountID])
  .then((result) => {
    console.log("Deleted account:", result.rows);
    return result.rows[0];
  })
  .catch((err) => {
    console.error("Error deleting account:", err.message); 
    throw err; 
  });
};

module.exports = {
  deleteAccountFromDB
};
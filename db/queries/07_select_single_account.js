const pool = require('../connection');

// /**
//  * Add an account to the accounts table.
//  */
const selectSingleAccountFromDB = function(accountID) {
  const queryString = `
  SELECT * FROM accounts
  WHERE id = $1;
  `;

  return pool
  .query(queryString, [accountID])
  .then((result) => {
    // console.log("Selected account:", result.rows);
    return result.rows[0];
  })
  .catch((err) => {
    console.error("Error finding account:", err.message); 
    throw err; 
  });
};

module.exports = {
  selectSingleAccountFromDB
};
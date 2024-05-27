const pool = require('../connection');

// /**
//  * Add an account to the accounts table.
//  */
const selectAccountFromDB = function() {
  const queryString = `SELECT * FROM accounts;`;

  return pool
  .query(queryString)
  .then((result) => {
    console.log("Selected account:", result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.error("Error finding account:", err.message); 
    throw err; 
  });
};

module.exports = {
  selectAccountFromDB
};
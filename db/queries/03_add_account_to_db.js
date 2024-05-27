const pool = require('../connection');

// /**
//  * Add an account to the accounts table.
//  */
const addAccountToDatabase = function(accountName, username, password, websiteURL, notes) {
  const queryString = `
  INSERT INTO accounts (account_name, username, password, website_url, description)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `
  const queryParams = [accountName, username, password, websiteURL, notes];

  return pool
  .query(queryString, queryParams)
  .then((result) => {
    console.log("Account added:", result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.error("Error adding account:", err.message); 
    throw err; 
  });
};

module.exports = {
  addAccountToDatabase
};
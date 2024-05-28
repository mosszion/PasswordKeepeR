const pool = require('../connection');

// /**
//  * Add an account to the accounts table.
//  */
const editAccountInDB = function(accountID, accountName, username, password, url, notes) {
  // Store account info in array
  let accountInfoArr = [accountID, accountName, username, password, url, notes];

  console.log(accountInfoArr);

  const queryString = `
  UPDATE accounts
  SET
    account_name = $2,
    username = $3,
    password = $4,
    website_url = $5,
    description = $6
  WHERE id = $1
  RETURNING *;
  `;

  return pool
  .query(queryString, accountInfoArr)
  .then((result) => {
    console.log("Edited account:", result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.error("Error editing account:", err.message); 
    throw err; 
  });
};

module.exports = {
  editAccountInDB
};
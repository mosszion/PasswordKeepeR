const pool = require('../connection');

// /**
//  * Add an account to the accounts table.
//  */
const doesAccountExist = function(username) {
  const queryString = `
  SELECT * FROM accounts
  WHERE username = $1;
  `;

  return pool
    .query(queryString, [username])
    .then((result) => {
      if (result.rows.length > 0) {
        // console.log("Account exists:", true);
        return true;
      } else {
        // console.log("Account does not exist:", false);
        return false;
      }
    })
    .catch((err) => {
      console.error("Error checking for account:", err.message); 
      throw err; 
    });
};

module.exports = {
  doesAccountExist
};

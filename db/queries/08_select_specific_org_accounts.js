const pool = require('../connection');

// /**
//  * Add an account to the accounts table.
//  */
const selectOrgAccountsFromDB = function(organizationID) {
  const queryString = `
  SELECT * FROM accounts
  WHERE $1 = organization_id;
  `;

  return pool
  .query(queryString, [organizationID])
  .then((result) => {
    // console.log("Selected account:", result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.error("Error finding account:", err.message); 
    throw err; 
  });
};

module.exports = {
  selectOrgAccountsFromDB
};
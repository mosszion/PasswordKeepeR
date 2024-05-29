const pool = require('../connection');

const isUserAdmin = function(userID, organizationID) {
  const queryString = `
  SELECT * FROM organizations
  WHERE admin_id = $1 AND id = $2;
  `;

  return pool
  .query(queryString, [userID, organizationID])
  .then((result) => {
    if (result.rows.length > 0) {
      // console.log("User is an admin:", true);
      return true;
    } else {
      // console.log("User is not an admin:", false);
      return false;
    }
  })
  .catch((err) => {
    console.error("Error finding user:", err.message); 
    throw err; 
  });
};

module.exports = {
  isUserAdmin
};
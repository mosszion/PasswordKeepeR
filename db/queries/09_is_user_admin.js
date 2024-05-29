const pool = require('../connection');

// /**
//  * Determin if the user is an admin for their org.
//  */
// const isUserAdmin = function(organizationID, userID) {
//   const queryString = `
//   SELECT * FROM organizations
//   JOIN users ON organization_id = organizations.id
//   WHERE $1 = organization_id;
//   `;

//   return pool
//   .query(queryString, [organizationID])
//   .then((result) => {
//     console.log("User Admin:", result.rows);
//     return result.rows;
//   })
//   .catch((err) => {
//     console.error("Error finding user:", err.message); 
//     throw err; 
//   });
// };

// module.exports = {
//   isUserAdmin
// };

const isUserAdmin = function(userID, organizationID) {
  const queryString = `
  SELECT * FROM organizations
  WHERE admin_id = $1 AND id = $2;
  `;

  return pool
  .query(queryString, [userID, organizationID])
  .then((result) => {
    if (result.rows.length > 0) {
      console.log("User is an admin:", true);
      return true;
    } else {
      console.log("User is not an admin:", false);
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
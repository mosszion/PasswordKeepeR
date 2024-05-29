const pool = require('../connection');

/**
 * Add a user to the users db.
 */
const addUserToUsersDatabase = function(username, email, password, organization_id) {
  const queryString = `  INSERT INTO users (username, email, password, organization_id)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `;

  return pool
  .query(queryString, [username, email, password, organization_id])
  .then((result) => {
    // console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.error("Error adding user to users database:", err.message); 
    throw err; 
  });
};

module.exports = {
  addUserToUsersDatabase
};
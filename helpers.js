// Helper function to find a user from email
const findUser = function(email, userDatabase) {
  for (let user in userDatabase) {
    // If the email matches a user email in the users object then return the user object
    if (userDatabase[user].email === email) return userDatabase[user];
  }
  return null;
};
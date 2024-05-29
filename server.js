// load .env data into process.env
const dotenv = require('dotenv');
dotenv.config();

// Import the helper functions
// const { findUser } = require('./helpers');

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8070;
// const PORT = 8070;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
// app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
// app.use(
//   '/styles',
//   sassMiddleware({
//     source: __dirname + '/styles',
//     destination: __dirname + '/public/styles',
//     isSass: false, // false => scss, true => sass
//   })
// );
app.use(express.static('public'));

// Tell Express to use the cookie-session middleware
app.use(cookieSession({
  name: 'session',
  keys: ['secret'],
}));

// Import the database functions
const { getUserWithEmail } = require('./db/queries/01_get_user_by_email');
const { addUserToUsersDatabase } = require('./db/queries/02_add_user_to_users_db');
const { addAccountToDatabase } = require('./db/queries/03_add_account_to_db');
const { selectAccountFromDB } = require('./db/queries/04_select_account');
const { deleteAccountFromDB } = require('./db/queries/05_delete_account');
const { editAccountInDB } = require('./db/queries/06_edit_account');
const { selectSingleAccountFromDB } = require('./db/queries/07_select_single_account');
const { selectOrgAccountsFromDB } = require('./db/queries/08_select_specific_org_accounts');
const { isUserAdmin } = require('./db/queries/09_is_user_admin');

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const userApiRoutes = require('./routes/users-api');
// const widgetApiRoutes = require('./routes/widgets-api');
const routes = require('./routes/routes');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
// app.use('/api/users', userApiRoutes);
// app.use('/api/widgets', widgetApiRoutes);
app.use('/routes', routes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  const userName = req.session.name;

  // Store session for organization id
  const organizationID = req.session.organizationID;

  // store session for passwordKeepr login username
  const passwordkeeprUserID = req.session.user_id;

  // Selects all accounts that belong to an organization and renders table dynamically
  selectOrgAccountsFromDB(organizationID).then((accounts) => {
    // console.log(accounts);
    isUserAdmin(passwordkeeprUserID, organizationID).then((admin) => {
      console.log(admin);
      res.render('index', {userName, accounts});
    })
  })
  .catch((error) => {
    console.error("Error rendering home page:", error);
    res.status(500).send("Internal Server Error");
  });

});

app.post ('/', (req,res) => {
  const name = req.body.email;
  const pass = req.body.password
  req.session.name = name;
  // console.log(name);

  res.render("index", {userName:name});

});

// Add an endpoint to handle a GET for /login
app.get("/login", (req, res) => {
  const userID = req.session.user_id;

  // If the user is already logged in then redirect to home page
  if (userID) {
    res.redirect("/");
  }

  // res.render("login", { user_id: userID });
  res.render("login")
});

// Add an endpoint to handle a POST to /login
app.post("/login", (req, res) => {
  // Store the user email and password
  const email = req.body.email;
  const password = req.body.password;

  // Get the users information using their email
  getUserWithEmail(email).then((user) => {
    // If a user with the login email cannot be found, then return response with status 403
    if (!user) {
      return res.status(403).send("Email not found: Please create an account. FYI 'CREATE ACCOUNT' DOES NOT WORK FOR THIS PORJECT - OUTSIDE OF SCOPE!!!");
    }

    // If a user that matches the email is found, then verify the password entered by the user
    // matches what is stored
    if (password !== user.password) {
      return res.status(403).send("Incorrect Password. FYI 'Forgot Password' outside of scope!!!");
    }

    req.session.organizationID = user.organization_id;

    // Set a cookie inside the session object to the value of the user's ID... TO DO
    req.session.user_id = user.id;

    // Set other required cookies
    req.session.email = user.email;
    req.session.name = user.username;

    res.redirect("/");
  })
  .catch((error) => {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  });
});

app.get('/new', (req, res) => {
  const userName = req.session.name;

  res.render('newAccount', { userName });
});

// Add an endpoint to handle a POST to /new
app.post("/new", (req, res) => {
  // Store the new account information
  const accountName = req.body.accountName;
  const username = req.body.username;
  const password = req.body.password;
  const url = req.body.url;
  const notes = req.body.notes;

  // Store the user email
  const email = req.session.email;

  // If the email doesn't exist then return error staus
  if (!email) {
    return res.status(403).send("User email not found.");
  }

  // Store the organization id
  getUserWithEmail(email).then((user) => {
    // If the user doesn't exists for the email then return error status
    if (!user) {
      return res.status(404).send("User not found with the provided email");
    }

    const organizationID = user.organization_id;

    // store organization session
    req.session.organizationID = organizationID;

    // Add a new account to the db
    addAccountToDatabase(accountName, username, password, url, notes, organizationID).then((account) => {
    // console.log(account);

      res.redirect("/");
    })
  })
  .catch((error) => {
    console.error("Error during adding account:", error);
    res.status(500).send("Internal Server Error");
  });

});

// Add an endpoint to handle a GET request to :account/edit
app.get("/edit", (req, res) => {
  const userName = req.body.username;

  // Store the account ID of the account to be edited
  const accountID = req.query.accountID;

  // Store the account information
  selectSingleAccountFromDB(accountID).then((accountInfo) => {
    console.log(accountInfo);
    res.render("edit", { userName, accountID, accountInfo });
  });

});

// Add an endpoint to handle a POST to :account/edit
app.post("/edit", (req, res) => {
  // Store the account ID of the account to be edited
  const accountID = req.body.accountID;

  // Store the edited account information
  accountName= req.body.accountName;
  username = req.body.username;
  password = req.body.password;
  url = req.body.url;
  notes = req.body.notes;

  // Delete account from the db
  editAccountInDB(accountID, accountName, username, password, url, notes).then((editedAccount) => {
    console.log(editedAccount);

    res.redirect("/");
  })
  .catch((error) => {
    console.error("Error editing account:", error);
    res.status(500).send("Internal Server Error");
  });
});

// Add an endpoint to handle a POST to :account/delete
app.post("/delete", (req, res) => {
  // Store the account ID of the account to be deleted
  const accountToDeleteID = req.body.accountID;

  // Delete account from the db
  deleteAccountFromDB(accountToDeleteID).then((deletedAccount) => {
    // console.log(deletedAccount);

    res.redirect("/");
  })
  .catch((error) => {
    console.error("Error deleting account:", error);
    res.status(500).send("Internal Server Error");
  });
});

// Add an endpoint ot handle GET to add_user
app.get('/add_user', (req, res) => {
  const userName = req.session.name;

  res.render('add_user', { userName });
});

// Add an endpoint to handle a POST to /add_user
app.post("/add_user", (req, res) => {
  // Store the new account information
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  
  const organizationID = req.session.organizationID;

  // req.session.username = username;

  // Store the organization id
  addUserToUsersDatabase(username, email, password, organizationID).then((newUser) => {
    console.log(newUser);

    res.redirect("/");
  })
  .catch((error) => {
    console.error("Error adding user to organization:", error);
    res.status(500).send("Internal Server Error");
  });

});

app.get('/logout',(req,res) => {
  req.session = null;
  res.clearCookie('session');
  res.render('login');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

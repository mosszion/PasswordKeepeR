// load .env data into process.env
const dotenv = require('dotenv');
dotenv.config();

// Import the database functions
// const { users } = require('./db/temp_db/database');
const {getUserWithEmail} = require('./db/queries/01_get_user_by_email');

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
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Tell Express to use the cookie-session middleware
app.use(cookieSession({
  name: 'session',
  keys: ['secret'],
}));

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
  res.render('index', {userName: "pat"});
});

// log in
app.get('/login/:user_id', (req, res) => {
  // set cookie using cookie-session
  req.session.user_id = req.params.user_id;

  // Redirect to home page..TO DO
  res.redirect('index');
});

// Add an endpoint to handle a GET for /login
app.get("/login", (req, res) => {
  const userID = req.session.user_id;

  // If the user is already logged in then redirect to home page
  if (userID) {
    res.redirect("index");
  }

  // res.render("login", { user_id: userID });
  res.render("login");
});

// Add an endpoint to handle a POST to /login
app.post("/login", (req, res) => {
  // Store the user email and password
  const email = req.body.email;
  const password = req.body.password;

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

    // Set a cookie inside the session object to the value of the user's ID... TO DO
    req.session.user_id = user.id;

    res.redirect("index");
  })
  .catch((error) => {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  });

});

// app.get('/new', (req, res) => {
//   res.render('newAccount', {userName: "mossi"});
// });

app.get('/logout',(req,res) => {
  res.render('login');
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

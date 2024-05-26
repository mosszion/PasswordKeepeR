// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8070;
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

  // If the user is already logged in then redirect to home page...fix after
  if (userID) {
    res.redirect("index");
  }

  // res.render("login", { user_id: userID });
  res.render("login");
});

// Add an endpoint to handle a POST to /login
app.post("/login", (req, res) => {
  /**
   * Write the code to determine what org the user belongs to and if they are an admin (use the email
   * entered to determine).
   * If they are an admin then let them create and delete accounts, as well as add users to users table.
   * If the user doesn't belong to an org then show idex page with no accounts
   */
  res.render("index")

});

app.get('/new', (req, res) => {
  res.render('newAccount', {userName: "mossi"});
});

app.get('/logout',(req,res) => {
  res.render('login');
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

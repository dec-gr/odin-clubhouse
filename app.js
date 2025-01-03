const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const pool = require('./db/pool');
const clubhouseRouter = require('./routes/clubhouseRouter');
const path = require('node:path');

// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');

// Create the Express application
const app = express();
app.set('view engine', 'ejs');

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- SESSION SETUP ----------------
 **/

app.use(
  session({
    store: new pgSession({ pool: pool }),
    secret: 'some secret',
    resave: false,
    saveUnitialised: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use('/', clubhouseRouter);

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000);

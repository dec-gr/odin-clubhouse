const passport = require('passport');
const db = require('../db/queries');
const bcrypt = require('bcryptjs');

exports.getIndex = (req, res, next) => {
  res.render('index', { title: 'Index' });
};

exports.getRegister = async (req, res, next) => {
  res.render('register', {
    title: 'Register',
  });
};

exports.postRegister = async (req, res, next) => {
  console.log('HELLO');
  const { first_name, last_name, email, password } = req.body;
  try {
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      await db.addUser({ first_name, last_name, email, hashedPassword });
    });
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
};

exports.getLogin = async (req, res, next) => {
  const form =
    '<h1>Login Page</h1><form method="post" action="login">\
                  Enter Username:<br><input type="text" name="email">\
                  <br>Enter Password:<br><input type="password" name="password">\
                  <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
};

exports.postLogin = async (req, res, next) => {
  passport.authenticate('local', {
    failureRedirect: '/login-failure',
    successRedirect: '/login-success',
  })(req, res, next);
};

exports.getHome = (req, res, next) => {
  res.send('This is the home page');
};

exports.getMessageFeed = async (req, res, next) => {
  const user = await req.user;
  res.render('messageFeed', { title: 'Message Feed', user: user });
};

exports.getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

const passport = require('passport');
const db = require('../db/queries');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.getIndex = (req, res, next) => {
  res.render('index', { title: 'Index' });
};

exports.getRegister = async (req, res, next) => {
  res.render('register', {
    title: 'Register',
  });
};

exports.postRegister = async (req, res, next) => {
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

exports.getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

/* -----  MEMBERSHIP FUNCTIONS ------ */

exports.getAddMember = (req, res, next) => {
  res.render('addMember', { title: '' });
};

exports.postAddMember = (req, res, next) => {
  const { secret_code } = req.body;

  if (secret_code === process.env.MEMBERSHIP_CODE) {
    db.addMember(req.user.user_id);
  }

  res.render('index', { title: 'Home' });
};

exports.getAddAdmin = (req, res, next) => {
  res.render('addAdmin', { title: '' });
};

exports.postAddAdmin = (req, res, next) => {
  const { secret_code } = req.body;

  if (secret_code === process.env.ADMIN_CODE) {
    db.addAdmin(req.user.user_id);
  }

  res.render('index', { title: 'Home' });
};

/* ----- MESSAGE FUNCTIONS ---- */

exports.getNewMessage = (req, res, next) => {
  res.render('newMessage', {
    title: 'New Message',
  });
};

exports.postNewMessage = async (req, res, next) => {
  const { title, content } = req.body;
  const user_id = req.user.user_id;
  try {
    db.addMessage({ user_id, title, content });
    res.redirect('messageFeed');
  } catch (err) {
    return next(err);
  }
};

exports.getDeleteMessage = async (req, res, next) => {
  const message_id = req.params.message_id;
  await db.deleteMessage(message_id);
  res.redirect('/messageFeed');
};

exports.getMessageFeed = async (req, res, next) => {
  const queryFunction = req.user.is_member
    ? db.getAllMessagesWithNamesMember
    : db.getAllMessagesWithNamesNonMember;
  const messages = await queryFunction();

  res.render('messageFeed', { title: 'Message Feed', messages: messages });
};

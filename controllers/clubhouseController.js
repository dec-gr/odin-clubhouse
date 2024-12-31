const passport = require('passport');
const db = require('../db/queries');
const bcrypt = require('bcryptjs');
require('dotenv').config();

/* -------- PUBLIC ROUTES ---------- */

exports.getIndex = (req, res, next) => {
  if (req.user) {
    res.redirect('/messageFeed');
  }

  res.render('index', { title: 'Index' });
};

exports.getRegister = async (req, res, next) => {
  if (req.user) {
    res.redirect('/messageFeed');
  }

  res.render('register', {
    title: 'Register',
  });
};

exports.postRegister = async (req, res, next) => {
  if (req.user) {
    res.redirect('/messageFeed');
  }

  const { first_name, last_name, email, password } = req.body;
  try {
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      await db.addUser({ first_name, last_name, email, hashedPassword });
    });
    res.redirect('/login');
  } catch (err) {
    return next(err);
  }
};

exports.getLogin = async (req, res, next) => {
  if (req.user) {
    res.redirect('/messageFeed');
  }

  res.render('login', { title: 'Log In' });
};

exports.postLogin = async (req, res, next) => {
  if (req.user) {
    res.redirect('/messageFeed');
  }

  passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/messageFeed',
  })(req, res, next);
};

/* -------------- USER ROUTES ------------ */

exports.getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

exports.getAddMember = (req, res, next) => {
  res.render('addMember', { title: '' });
};

exports.postAddMember = (req, res, next) => {
  const { secret_code } = req.body;

  if (secret_code === process.env.MEMBERSHIP_CODE) {
    db.addMember(req.user.user_id);
  }

  res.redirect('/messageFeed');
};

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

exports.getMessageFeed = async (req, res, next) => {
  const queryFunction = req.user.is_member
    ? db.getAllMessagesWithNamesMember
    : db.getAllMessagesWithNamesNonMember;
  const messages = await queryFunction();

  res.render('messageFeed', { title: 'Message Feed', messages: messages });
};

/* -----  MEMBER ROUTES ------ */

exports.getAddAdmin = (req, res, next) => {
  res.render('addAdmin', { title: '' });
};

exports.postAddAdmin = (req, res, next) => {
  const { secret_code } = req.body;

  if (secret_code === process.env.ADMIN_CODE) {
    db.addAdmin(req.user.user_id);
  }

  res.redirect('/messageFeed');
};

/* ----- ADMIN FUNCTIONS ---- */

exports.getDeleteMessage = async (req, res, next) => {
  const message_id = req.params.message_id;
  await db.deleteMessage(message_id);
  res.redirect('/messageFeed');
};

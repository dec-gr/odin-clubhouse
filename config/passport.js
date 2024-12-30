const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/queries');
const bcrypt = require('bcryptjs');

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
};

const verifyCallback = async (username, password, done) => {
  console.log('IN THIS HB');
  try {
    const user = await db.getUserByEmail(username);

    if (!user) {
      return done(null, false, { message: 'Incorrect email' });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = db.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

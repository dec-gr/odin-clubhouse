const db = require('../db/queries');

exports.getRegister = async (req, res, next) => {
  const form =
    '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="uname">\
                    <br>Enter Password:<br><input type="password" name="pw">\
                    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
};

exports.postRegister = async (req, res, next) => {
  res.redirect('/home');
};

exports.getLogin = async (req, res, next) => {
  const form =
    '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="uname">\
    <br>Enter Password:<br><input type="password" name="pw">\
    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
};

exports.postLogin = async (req, res, next) => {
  res.redirect('/home');
};

exports.getHome = (req, res, next) => {
  res.send('This is the home page');
};

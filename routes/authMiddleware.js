module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ msg: 'You are not authorised to view this resource' });
  }
};

module.exports.isMember = (req, res, next) => {
  if (req.isAuthenticated() && req.user.is_member) {
    next();
  } else {
    res.status(401).json({
      msg: 'You are not authorised to view this resource because you are not a member',
    });
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.is_admin) {
    next();
  } else {
    res.status(401).json({
      msg: 'You are not authorised to delet messages as you are not an admin',
    });
  }
};

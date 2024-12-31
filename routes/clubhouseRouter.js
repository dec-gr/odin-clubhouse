const { Router } = require('express');
const passport = require('passport');
const isAuth = require('./authMiddleware').isAuth;
const isMember = require('./authMiddleware').isMember;
const isAdmin = require('./authMiddleware').isAdmin;

const clubhouseController = require('../controllers/clubhouseController');
const clubhouseRouter = Router();

/* -------- PUBLIC ROUTES ------ */

clubhouseRouter.get('/', clubhouseController.getIndex);

clubhouseRouter.get('/register', clubhouseController.getRegister);
clubhouseRouter.post('/register', clubhouseController.postRegister);

clubhouseRouter.get('/login', clubhouseController.getLogin);
clubhouseRouter.post('/login', clubhouseController.postLogin);

/* -------- USER ROUTES ------- */

clubhouseRouter.get('/logout', isAuth, clubhouseController.getLogout);

clubhouseRouter.get('/messageFeed', isAuth, clubhouseController.getMessageFeed);

clubhouseRouter.get('/addMember', isAuth, clubhouseController.getAddMember);
clubhouseRouter.post('/addMember', isAuth, clubhouseController.postAddMember);

/* -------- MEMBER ROUTES ------- */

clubhouseRouter.get('/newMessage', isMember, clubhouseController.getNewMessage);
clubhouseRouter.post(
  '/newMessage',
  isMember,
  clubhouseController.postNewMessage
);

clubhouseRouter.get('/addAdmin', isMember, clubhouseController.getAddAdmin);
clubhouseRouter.post('/addAdmin', isMember, clubhouseController.postAddAdmin);

/* -------- ADMIN ROUTES ------- */

clubhouseRouter.get(
  '/messages/:message_id/delete',
  isAdmin,
  clubhouseController.getDeleteMessage
);

module.exports = clubhouseRouter;

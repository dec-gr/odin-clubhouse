const { Router } = require('express');
const passport = require('passport');
const isAuth = require('./authMiddleware').isAuth;
const isMember = require('./authMiddleware').isMember;
const isAdmin = require('./authMiddleware').isAdmin;

const clubhouseController = require('../controllers/clubhouseController');
const clubhouseRouter = Router();

clubhouseRouter.get('/', clubhouseController.getIndex);

clubhouseRouter.get('/register', clubhouseController.getRegister);
clubhouseRouter.post('/register', clubhouseController.postRegister);

clubhouseRouter.get('/login', clubhouseController.getLogin);
clubhouseRouter.post('/login', clubhouseController.postLogin);

clubhouseRouter.get('/logout', clubhouseController.getLogout);

clubhouseRouter.get('/home', clubhouseController.getHome);

clubhouseRouter.get('/messageFeed', isAuth, clubhouseController.getMessageFeed);

clubhouseRouter.get('/newMessage', isMember, clubhouseController.getNewMessage);
clubhouseRouter.post(
  '/newMessage',
  isMember,
  clubhouseController.postNewMessage
);

clubhouseRouter.get(
  '/messages/:message_id/delete',
  isAdmin,
  clubhouseController.getDeleteMessage
);

clubhouseRouter.get('/addMember', clubhouseController.getAddMember);
clubhouseRouter.post('/addMember', clubhouseController.postAddMember);

clubhouseRouter.get('/addAdmin', clubhouseController.getAddAdmin);
clubhouseRouter.post('/addAdmin', clubhouseController.postAddAdmin);

module.exports = clubhouseRouter;

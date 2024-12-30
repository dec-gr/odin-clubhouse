const { Router } = require('express');
const passport = require('passport');
const isAuth = require('./authMiddleware').isAuth;

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

module.exports = clubhouseRouter;

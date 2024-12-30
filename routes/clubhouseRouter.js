const { Router } = require('express');
const clubhouseController = require('../controllers/clubhouseController');
const clubhouseRouter = Router();

clubhouseRouter.get('/register', clubhouseController.getRegister);
clubhouseRouter.post('/register', clubhouseController.postRegister);

clubhouseRouter.get('/login', clubhouseController.getLogin);
clubhouseRouter.post('/login', clubhouseController.postLogin);

clubhouseRouter.get('/home', clubhouseController.getHome);

module.exports = clubhouseRouter;

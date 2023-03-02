const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../auth')

const Router = express.Router();

//Router for register user
Router.post('/register', userController.register);
//Router for login and authentication
Router.post('/login', userController.login);
//Router for retreive all user
Router.get('/', auth.verify, userController.retreive)
//Routes with params
Router.get('/:_id', userController.userDetails)


module.exports = Router;
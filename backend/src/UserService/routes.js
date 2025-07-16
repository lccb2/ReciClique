const express = require('express');
const UserController = require('./UserController');
const User = require('../models/User');
const loginRequired = require('../middlewares/loginRequired');

const routes = express.Router();

//Rotas
routes.get('/users/:user_id', loginRequired, UserController.show);
routes.patch('/users/:user_id', loginRequired, UserController.update);
routes.delete('/users/:user_id', loginRequired, UserController.erase)

module.exports = routes;

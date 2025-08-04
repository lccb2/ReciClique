const express = require('express');
const UserController = require('./UserController');
const loginRequired = require('../middlewares/loginRequired');

const routes = express.Router();

//Rotas
routes.get('/users/:user_id', loginRequired, UserController.show);
routes.patch('/users', loginRequired, UserController.update);
routes.delete('/users', loginRequired, UserController.erase)

module.exports = routes;

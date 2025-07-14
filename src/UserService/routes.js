const express = require('express');
const UserController = require('./UserController');
const User = require('../models/User');

const routes = express.Router();

//Rotas
routes.post('/users', UserController.store);
routes.get('/users/:user_id', UserController.show);
routes.patch('/users/:user_id', UserController.update);
routes.delete('/users/:user_id', UserController.erase)

module.exports = routes;

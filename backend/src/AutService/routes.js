const express = require('express');
const AutController = require('./AutController');
const routes = express.Router();

routes.post('/register', AutController.register);
routes.post('/login', AutController.login);

module.exports = routes;
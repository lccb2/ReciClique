const express = require('express');
const PagController = require('./PagController');
const loginRequired = require('../middlewares/loginRequired');

const routes = express.Router();

routes.get('/users/:user_id/posts', loginRequired, PagController.index);

module.exports = routes;
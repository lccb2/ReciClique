const express = require('express');
const PagController = require('./PagController');

const routes = express.Router();

routes.get('/users/:user_id/posts', PagController.index);

module.exports = routes;
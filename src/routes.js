const express = require('express');
const UserController = require('./UserService/UserController');
const PostController = require('./PostService/PostController');
const PagController = require('./PagService/PagController')

const routes = express.Router();

routes.post('/users', UserController.store);

routes.get('/users/:user_id/posts', PagController.index);
routes.post('/users/:user_id/posts', PostController.store);

module.exports = routes;
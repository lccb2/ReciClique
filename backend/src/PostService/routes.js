const express = require('express');
const PostController = require('./PostController');
const loginRequired = require('../middlewares/loginRequired');

const routes = express.Router();

routes.post('/users/posts', loginRequired, PostController.store);
routes.get('/posts/recent', loginRequired, PostController.recent);
routes.get('/posts/:post_id', loginRequired, PostController.show);
routes.delete('/posts/:post_id', loginRequired, PostController.erase);
routes.patch('/posts/:post_id', loginRequired, PostController.update);

module.exports = routes;

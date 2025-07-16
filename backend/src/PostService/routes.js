const express = require('express');
const PostController = require('./PostController');
const loginRequired = require('../middlewares/loginRequired');

const routes = express.Router();

routes.post('/users/:user_id/posts', loginRequired, PostController.store);
routes.get('/posts/recent', loginRequired, PostController.recent);
routes.get('/posts/:post_id', loginRequired, PostController.show);
routes.delete('/posts/:post_id', loginRequired,PostController.erase);
routes.patch('/posts/:post_id', loginRequired, PostController.update);
routes.patch('/posts/:post_id/like', loginRequired, PostController.incrementLike);
routes.patch('/posts/:post_id/unlike', loginRequired, PostController.decrementLike);

module.exports = routes;

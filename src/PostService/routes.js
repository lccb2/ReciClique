const express = require('express');
const PostController = require('./PostController');

const routes = express.Router();

routes.post('/users/:user_id/posts', PostController.store);
routes.get('/posts/:post_id', PostController.show);
routes.delete('/posts/:post_id', PostController.erase);
routes.patch('/posts/:post_id/like', PostController.incrementLike);
routes.patch('/posts/:post_id/unlike', PostController.decrementLike);

module.exports = routes;

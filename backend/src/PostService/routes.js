const express = require('express');
const PostController = require('./PostController');
const loginRequired = require('../middlewares/loginRequired');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const routes = express.Router();

routes.post('/users/posts', [loginRequired, upload.array('photos')], PostController.store);
routes.get('/posts/recent', loginRequired, PostController.recent);
routes.get('/posts/:post_id', loginRequired, PostController.show);
routes.delete('/posts/:post_id', loginRequired, PostController.erase);
routes.patch('/posts/:post_id', [loginRequired, upload.array('photos')], PostController.update);
routes.get('/posts/user/:user_id', loginRequired, PostController.userPosts);

module.exports = routes;

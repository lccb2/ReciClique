const express = require('express');
const ComentController = require('./ComentController');
const loginRequired = require('../middlewares/loginRequired');

const routes = express.Router();

// comentários
routes.post('/comment', loginRequired, ComentController.createComment);
routes.get('/comments/:post_id', loginRequired, ComentController.listComments);

// curtidas
routes.post('/like', loginRequired, ComentController.like);
routes.post('/unlike', loginRequired, ComentController.unlike);
routes.get('/isliked', loginRequired, ComentController.isLiked);

module.exports = routes;

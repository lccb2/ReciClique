const express = require('express');
const ComentController = require('./ComentController');

const routes = express.Router();

// comentários
routes.post('/comment', ComentController.createComment);
routes.get('/comments/:post_id', ComentController.listComments);

// curtidas
routes.post('/like', ComentController.like);
routes.post('/unlike', ComentController.unlike);
routes.get('/isliked', ComentController.isLiked);

module.exports = routes;

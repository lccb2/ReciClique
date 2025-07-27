const express = require('express');
const PesqController = require('./PesqController');
const loginRequired = require('../middlewares/loginRequired');

const routes = express.Router();

routes.get('/materiais', loginRequired, PesqController.index);
routes.post('/search', loginRequired, PesqController.searchByMaterials);

module.exports = routes;

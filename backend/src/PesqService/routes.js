const express = require('express');
const PesqController = require('./PesqController');

const routes = express.Router();

routes.post('/search', PesqController.searchByMaterials);

module.exports = routes;

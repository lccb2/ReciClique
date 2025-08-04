const express = require('express');
const AutController = require('./AutController');
const routes = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

routes.post('/register', upload.single('photo'), AutController.register);
routes.post('/login', AutController.login);

module.exports = routes;
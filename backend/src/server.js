const express = require('express');
require('dotenv').config();

const userRoutes = require('./UserService/routes.js');
const publiRoutes = require('./PostService/routes.js');
const pagRoutes = require('./PagService/routes.js');
const autRoutes = require('./AutService/routes.js');
const comentRoutes = require('./ComentService/routes.js');
const pesqRoutes = require('./PesqService/routes.js');

require('./database')

const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(publiRoutes);
app.use(pagRoutes);
app.use(autRoutes);
app.use('/coment', comentRoutes);
app.use('/pesq', pesqRoutes);

app.listen(3333);

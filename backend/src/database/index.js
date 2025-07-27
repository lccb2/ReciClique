const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Materiais = require('../models/Materiais');
const PostLike = require('../models/PostLike');
const PostMaterial = require('../models/PostMaterial');

const models = [User, Post, Comment, Materiais, PostLike, PostMaterial];

const connection = new Sequelize(dbConfig);

models.forEach(model => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));

module.exports = connection;
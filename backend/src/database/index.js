const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');


const connection = new Sequelize(dbConfig);

User.init(connection);
Post.init(connection);
Comment.init(connection);

User.associate(connection.models);
Post.associate(connection.models);

module.exports = connection;
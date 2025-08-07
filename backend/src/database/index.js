const Sequelize = require("sequelize");

const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Materiais = require("../models/Materiais");
const PostLike = require("../models/PostLike");
const PostMaterial = require("../models/PostMaterial");

const models = [User, Post, Comment, Materiais, PostLike, PostMaterial];

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

connection
  .authenticate()
  .then(() => console.log("Conectado ao Supabase com sucesso!"))
  .catch((err) => console.error("Erro na conexão:", err));

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);

module.exports = connection;

const { Model, DataTypes } = require("sequelize");
const database = require("../config/database");

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        photo: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        link: DataTypes.TEXT,
        likes: DataTypes.INTEGER,
        photo_2: DataTypes.STRING,
        photo_3: DataTypes.STRING,
      },
      {
        sequelize,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        tableName: "posts",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });

    this.belongsToMany(models.User, {
      foreignKey: "post_id",
      through: "post_like",
      as: "users",
    });

    this.hasMany(models.Comment, {
      foreignKey: "post_id",
      as: "comments",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    this.hasMany(models.PostMaterial, {
      foreignKey: "post_id",
      as: "post_materiais",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    this.hasMany(models.PostLike, {
      foreignKey: "post_id",
      as: "post_likes",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

module.exports = Post;

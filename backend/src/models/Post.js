const { Model, DataTypes } = require('sequelize');
const database = require('../config/database');

class Post extends Model {
    static init(sequelize) {
        super.init({
            photo: DataTypes.STRING,
            title: DataTypes.STRING,
            description: DataTypes.TEXT,
            link: DataTypes.TEXT,
            likes: DataTypes.INTEGER,
            photo_2: DataTypes.STRING,
            photo_3: DataTypes.STRING,
        }, {
            sequelize,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            tableName: 'posts',
        })
    }

    static associate(models){
        //Associação: dono do post
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });

        //Associação: users que curtiram o post;
        this.belongsToMany(models.User, { foreignKey: 'post_id', through: 'post_like', as: 'users' });

        //Associação: comentários do post
        this.hasMany(models.Comment, { foreignKey: 'post_id', as: 'comments' })

        this.hasMany(models.PostMaterial, { foreignKey: 'post_id', as: 'post_materiais' })

        this.hasMany(models.PostLike, { foreignKey: 'post_id', as: 'post_likes' })
    }
}

module.exports = Post;
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
        }, {
            sequelize
        })
    }

    static associate(models){
        //Associação: dono do post
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });

        //Associação: users que curtiram o post;
        this.belongsToMany(models.User, { foreignKey: 'post_id', through: 'post_like', as: 'users' });
    }
}

module.exports = Post;
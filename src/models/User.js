const { Model, DataTypes } = require('sequelize');
const database = require('../config/database');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            username: DataTypes.STRING,
            password: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models){
        //Associação: posts que postou
        this.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' });

        //Associação: posts que curtiu
        this.belongsToMany(models.Post, { foreignKey: 'user_id', through: 'post_like', as: 'likedposts' });
    }
}

module.exports = User;
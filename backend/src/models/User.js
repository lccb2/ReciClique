const { Model, DataTypes } = require('sequelize');
const database = require('../config/database');
const bcryptjs = require('bcryptjs');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            username: {
                type: DataTypes.STRING,
                unique: true
            },
            password: DataTypes.STRING,
            password_sent: DataTypes.VIRTUAL,
        }, {
            sequelize
        })

        this.addHook('beforeSave', async user => {
            user.password = await bcryptjs.hash(user.password_sent, 8);
        });
    }


    static associate(models) {
        //Associação: posts que postou
        this.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' });

        //Associação: comentários que fez
        this.hasMany(models.Comment, { foreignKey: 'user_id', as: 'comments' });

        //Associação: posts que curtiu
        this.belongsToMany(models.Post, { foreignKey: 'user_id', through: 'post_like', as: 'likedposts' });
    }

    passwordIsValid(password) {
        return bcryptjs.compare(password, this.password);
    }
}

module.exports = User;
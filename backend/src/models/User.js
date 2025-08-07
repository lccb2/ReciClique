const { Model, DataTypes } = require('sequelize');
const database = require('../config/database');
const bcryptjs = require('bcryptjs');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                unique: true
            },
            password: DataTypes.STRING,
            password_sent: DataTypes.VIRTUAL,
            photo: DataTypes.STRING,
            instagram: {
                type: DataTypes.STRING,
                allowNull: true
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            greeting: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            show_email:{
                type: DataTypes.BOOLEAN,
                defaultValue : false,
                allowNull: false
            },
            show_phone:{
                type: DataTypes.BOOLEAN,
                defaultValue : false,
                allowNull: false
            },
            show_insta:{
                type: DataTypes.BOOLEAN,
                defaultValue : false,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'users',
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        })

        this.addHook('beforeSave', async user => {
            if (user.password_sent) {
                user.password = await bcryptjs.hash(user.password_sent, 8);
            }
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
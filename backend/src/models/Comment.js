const { Model, DataTypes } = require('sequelize');
const database = require('../config/database');

class Comment extends Model {
    static init(sequelize) {
        super.init({
            text: DataTypes.TEXT,
        }, {
            sequelize,
            timestamps: true,
            created_at: 'created_at',
            updated_at: 'updated_at',
        })
    }

    static associate(models){
        //Associação: usuário e post do comentário
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
        
    }
}

module.exports = Comment;
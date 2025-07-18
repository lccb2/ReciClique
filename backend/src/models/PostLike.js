const { Model, DataTypes } = require('sequelize');

class PostLike extends Model {
    static init(sequelize) {
        super.init({}, {
            sequelize,
            tableName: 'post_like',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        });
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
    }
}

module.exports = PostLike;

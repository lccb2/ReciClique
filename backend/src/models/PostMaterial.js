const { Model, DataTypes } = require('sequelize');

class PostMaterial extends Model {
    static init(sequelize) {
        super.init({}, {
            sequelize,
            tableName: 'post_materiais',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        });
    }

    static associate(models) {
        this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
        this.belongsTo(models.Materiais, { foreignKey: 'material_id', as: 'material' });
    }
}

module.exports = PostMaterial;

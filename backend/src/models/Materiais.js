const { Model, DataTypes } = require('sequelize');
const database = require('../config/database');

class Materiais extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'materiais',
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        })
    }

    static associate(models){
        
    }
}

module.exports = Materiais;

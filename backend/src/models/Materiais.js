const { Model, DataTypes } = require('sequelize');
const database = require('../config/database');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models){
        
    }
}

module.exports = Materiais;
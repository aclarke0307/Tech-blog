const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//user model
class User extends Model {}

//define table columns and configuration
User.init(
    {
        //id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
         //username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        //password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const { noRawAttributes } = require('sequelize/lib/utils/deprecations');
//user model
class User extends Model {
    //set up method to runon instance data (per user) to check password
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
}

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
        hooks: {
           // set up beforeCreate lifecycle "hooks" functionality
           async beforeCreate(newUserData) {
               newUserData.password = await bcrypt.hash(newUserData.password, 10);
               return newUserData;
           },
           // set up beforeUpdate lifecycle "hook" functionality
           async beforeUpdate(updatedUserData) {
               updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
               return updatedUserData;
           }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;

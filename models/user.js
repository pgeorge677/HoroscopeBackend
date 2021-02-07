'use strict';
const {
    Model, DataTypes
} = require('sequelize');
const {
    STRING, UUID, UUIDV4,
} = DataTypes;

module.exports = (sequelize, DateType) => {
    class User extends Model {
        static associate({Post}) {
            User.hasMany(Post, {foreignKey: 'userId', as: 'posts', allowNull: false})
        }

        toJSON() {
            return {...this.get(), id: undefined}
        }
    }

    User.init({
        uuid: {
            type: UUID,
            defaultValue: UUIDV4
        },
        name: {
            type: STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'User must have a name'},
                notEmpty: {msg: 'User must not be empty'}
            }
        },
        email: {
            type: STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'User must have a name'},
                notEmpty: {msg: 'email must not be empty'},
                isEmail: {msg: 'Must be a valid email address'},
            }
        },
        role: {
            type: STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'User must have a name'},
                notEmpty: {msg: 'role must not be empty'}
            }
        }
    }, {
        sequelize,
        tableName: 'users',
        modelName: 'User',
    });
    return User;
};

'use strict';
const {
    Model, DataTypes
} = require('sequelize');
const {
    STRING, UUID, UUIDV4,
} = DataTypes;

module.exports = (sequelize, ignored) => {
    class Day extends Model {
        static associate({Sign}) {
            Day.belongsTo(Sign, {foreignKey: 'signId', as: 'signs', allowNull: false})
        }

        toJSON() {
            return {
                ...this.get(),
                id: undefined,
                description: this.getDataValue('description').toString('utf8'),
                signId: undefined,
                createdAt: undefined,
                updatedAt: undefined
            }
        }
    }

    Day.init({
        uuid: {
            type: UUID,
            defaultValue: UUIDV4
        },
        title: {
            type: STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Day must have a title'},
                notEmpty: {msg: 'Title must not be empty'}
            }
        },
        description: {
            type: STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Day must have a description'},
                notEmpty: {msg: 'Description must not be empty'}
            }
        },
    }, {
        sequelize,
        tableName: 'days',
        modelName: 'Day',
    });
    return Day;
};

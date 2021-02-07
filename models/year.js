'use strict';

const {
    Model, DataTypes
} = require('sequelize');
const {
    STRING, UUID, UUIDV4, TEXT,
} = DataTypes;

module.exports = (sequelize, ignored) => {
    class Year extends Model {
        static associate({Sign}) {
            Year.belongsTo(Sign, {foreignKey: 'signId', as: 'signs', allowNull: false})
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

    Year.init({
        uuid: {
            type: UUID,
            defaultValue: UUIDV4
        },
        title: {
            type: STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Year must have a title'},
                notEmpty: {msg: 'Title must not be empty'}
            }
        },
        description: {
            type: TEXT,
            allowNull: false,
            validate: {
                notNull: {msg: 'Year must have a description'},
                notEmpty: {msg: 'Description must not be empty'}
            }
        },
    }, {
        sequelize,
        tableName: 'years',
        modelName: 'Year',
    });
    return Year;
};

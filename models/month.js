'use strict';
const {
    Model, DataTypes
} = require('sequelize');
const {
    STRING, UUID, UUIDV4,
} = DataTypes;

module.exports = (sequelize, ignored) => {
    class Month extends Model {
        static associate({Sign}) {
            Month.belongsTo(Sign, {foreignKey: 'signId', as: 'signs', allowNull: false})
        }

        toJSON() {
            return {
                ...this.get(),
                id: undefined,
                description: this.getDataValue('description').toString('utf8'),
                love: this.getDataValue('love').toString('utf8'),
                work: this.getDataValue('work').toString('utf8'),
                heal: this.getDataValue('heal').toString('utf8'),
                signId: undefined,
                createdAt: undefined,
                updatedAt: undefined
            }
        }
    }

    Month.init({
        uuid: {
            type: UUID,
            defaultValue: UUIDV4
        },
        title: {
            type: STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Week must have a title'},
                notEmpty: {msg: 'Title must not be empty'}
            }
        },
        description: {
            type: STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Week must have a title'},
                notEmpty: {msg: 'Title must not be empty'}
            }
        },
        love: {
            type: STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Week must have a title'},
                notEmpty: {msg: 'Title must not be empty'}
            }
        },
        work: {
            type: STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Week must have a title'},
                notEmpty: {msg: 'Title must not be empty'}
            }
        },
        heal: {
            type: STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Week must have a title'},
                notEmpty: {msg: 'Title must not be empty'}
            }
        },
    }, {
        sequelize,
        tableName: 'months',
        modelName: 'Month',
    });
    return Month;
};

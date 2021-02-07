'use strict';
const {
    Model, DataTypes
} = require('sequelize');
const {
    STRING, UUID, UUIDV4,
} = DataTypes;

module.exports = (sequelize, ignored) => {
    class Sign extends Model {
        static associate({Characteristic, Day, Week, Month, Year}) {
            Sign.hasMany(Characteristic, {foreignKey: 'signId', as: 'characteristics', allowNull: false})
            Sign.hasMany(Day, {foreignKey: 'signId', as: 'days', allowNull: false})
            Sign.hasMany(Week, {foreignKey: 'signId', as: 'weeks', allowNull: false})
            Sign.hasMany(Month, {foreignKey: 'signId', as: 'months', allowNull: false})
            Sign.hasMany(Year, {foreignKey: 'signId', as: 'years', allowNull: false})
        }

        toJSON() {
            return {...this.get(), id: undefined, createdAt: undefined, updatedAt: undefined}
        }
    }

    Sign.init({
        uuid: {
            type: UUID,
            defaultValue: UUIDV4
        },
        name: {
            type: STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Sign must have a name'},
                notEmpty: {msg: 'Sign must not be empty'}
            }
        },
    }, {
        sequelize,
        tableName: 'signs',
        modelName: 'Sign',
    });
    return Sign;
};

'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const {
  STRING, UUID, UUIDV4,
} = DataTypes;

module.exports = (sequelize, ignored) => {
  class Week extends Model {
    static associate({Sign}) {
      Week.belongsTo(Sign, {foreignKey: 'signId', as: 'signs', allowNull: false})
    }

    toJSON() {
      return {...this.get(), id: undefined, signId: undefined, createdAt: undefined, updatedAt: undefined}
    }
  }

  Week.init({
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
        notNull: {msg: 'Week must have a description'},
        notEmpty: {msg: 'Description must not be empty'}
      }
    },
  }, {
    sequelize,
    tableName: 'weeks',
    modelName: 'Week',
  });
  return Week;
};

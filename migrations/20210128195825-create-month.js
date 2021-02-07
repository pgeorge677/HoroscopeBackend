'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('months', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes["INTEGER"]
      },
      uuid:{
        type: DataTypes["UUID"],
        defaultValue: DataTypes["UUIDV4"],
      },
      title: {
        allowNull: false,
        type: DataTypes["STRING"]
      },
      description: {
        allowNull: false,
        type: DataTypes["BLOB"]("long")
      },
      love: {
        allowNull: false,
        type: DataTypes["BLOB"]("long")
      },
      work: {
        allowNull: false,
        type: DataTypes["BLOB"]("long")
      },
      heal: {
        allowNull: false,
        type: DataTypes["BLOB"]("long")
      },
      signId: {
        type: DataTypes["INTEGER"],
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes["DATE"]
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes["DATE"]
      }
    });
  },
  down: async (queryInterface, ignored) => {
    await queryInterface.dropTable('months');
  }
};

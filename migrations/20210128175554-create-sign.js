'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('signs', {
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
      name: {
        allowNull: false,
        type: DataTypes["STRING"]
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
    await queryInterface.dropTable('signs');
  }
};

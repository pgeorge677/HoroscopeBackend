'use strict';
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('characteristics', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes["INTEGER"]
            },
            uuid: {
                type: DataTypes["UUID"],
                defaultValue: DataTypes["UUIDV4"],
            },
            symbolize: {
                allowNull: false,
                type: DataTypes["BLOB"]("long")
            },
            element: {
                allowNull: false,
                type: DataTypes["STRING"]
            },
            season: {
                allowNull: false,
                type: DataTypes["STRING"]
            },
            character: {
                allowNull: false,
                type: DataTypes["STRING"]
            },
            positive: {
                allowNull: false,
                type: DataTypes["STRING"]
            },
            negative: {
                allowNull: false,
                type: DataTypes["STRING"]
            },
            dayOfWeek: {
                allowNull: false,
                type: DataTypes["STRING"]
            },
            color: {
                allowNull: false,
                type: DataTypes["STRING"]
            },
            planet: {
                allowNull: false,
                type: DataTypes["STRING"]
            },
            perfume: {
                allowNull: false,
                type: DataTypes["STRING"]
            },
            description: {
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
        await queryInterface.dropTable('characteristics');
    }
};

'use strict';

module.exports = {
    up: async (queryInterface, ignored) => {
        await queryInterface.bulkInsert('signs', [
            {
                uuid: "9804e106-807b-424e-9d9b-28c5dgo7jyg1",
                name: "Aries",
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                uuid: "9804e106-807b-424e-9d9b-28c5dgo7jyg2",
                name: "Tauro",
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                uuid: "9804e106-807b-424e-9d9b-28c5dgo7jyg3",
                name: "Geminis",
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                uuid: "0756f88a-e73b-445d-803b-01fc32b926a4",
                name: "Cancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                uuid: "0756f88a-e73b-445d-803b-01fc32b926a5",
                name: "Leo",
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                uuid: "0756f88a-e73b-445d-803b-01fc32b926a6",
                name: "Virgo",
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                uuid: "0756f88a-e73b-445d-803b-01fc32b926a7",
                name: "Libra",
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                uuid: "0756f88a-e73b-445d-803b-01fc32b926a8",
                name: "Escorpio",
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                uuid: "0756f88a-e73b-445d-803b-01fc32b926a9",
                name: "Sagitario",
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                uuid: "0756f88a-e73b-445d-803b-01fc32b92610",
                name: "Capricornio",
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                uuid: "0756f88a-e73b-445d-803b-01fc32b92611",
                name: "Acuario",
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                uuid: "0756f88a-e73b-445d-803b-01fc32b92612",
                name: "Piscis",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], {});
    },

    down: async (queryInterface, ignored) => {
        await queryInterface.bulkDelete('signs', null, {});
    }
};

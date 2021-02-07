'use strict';

module.exports = {
    up: async (queryInterface, ignored) => {
        await queryInterface.bulkInsert('posts', [
            {
                uuid: "9804e106-807b-424e-9d9b-28c5dgo7jyg1",
                body: "New post fake 1, automatically",
                userId: "3",
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                uuid: "9804e106-807b-424e-9d9b-28c5dgo7jyg2",
                body: "New post fake 2, automatically",
                userId: "3",
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                uuid: "9804e106-807b-424e-9d9b-28c5dgo7jyg3",
                body: "New post fake 3, automatically",
                userId: "3",
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                uuid: "0756f88a-e73b-445d-803b-01fc32b926a4",
                body: "New post fake 4, automatically",
                userId: "3",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], {});
    },

    down: async (queryInterface, ignored) => {
        await queryInterface.bulkDelete('posts', null, {});
    }
};

'use strict';

module.exports = {

    up: async (queryInterface, ignored) => {
        await queryInterface.bulkInsert('users', [
            {
                name: 'John Doe',
                email: 'john@test.com',
                uuid: '9804e106-807b-424e-9d9b-28c5fbc6bfe6',
                role: "admin",
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Jane Doe',
                email: 'jane@test.com',
                uuid: '9804e106-807b-424e-9d9b-28c5fcd5cgd1',
                role: "super_admin",
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Nick Doe',
                email: 'nick@test.com',
                uuid: '9804e106-807b-424e-9d9b-28c5dgo7jyg5',
                role: "editor",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: async (queryInterface, ignored) => {
        await queryInterface.bulkDelete('users', null, {});
    }
};

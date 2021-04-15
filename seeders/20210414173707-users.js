'use strict';

const uuidv4 = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return  queryInterface.bulkInsert('users',
      [
        {
          id: 'd9605c85-3bdb-4ba7-bf69-ab00c4aae5a',
          email: "test1@test.dev",
          given_name: "Edu",
          family_name: "Lazaro",
          created: new Date().toDateString(),
        },
        {
          id: uuidv4(),
          email: "test2@test.dev",
          given_name: "Daniel",
          family_name: "LaRusso",
          created: new Date().toDateString(),
        },
        {
          id: uuidv4(),
          email: "test3@test.dev",
          given_name: "Hideo",
          family_name: "Miyagi",
          created: new Date().toDateString(),
        },
      ], {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('users', null, {});
  }
};

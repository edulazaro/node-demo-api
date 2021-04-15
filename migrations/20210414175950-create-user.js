const { UUIDV4 }  = require("sequelize");

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
        id: {
          type: Sequelize.UUID,
          defaultValue: UUIDV4,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        given_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        family_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created: {
          allowNull: false,
          type: Sequelize.DATE
        },
      },
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
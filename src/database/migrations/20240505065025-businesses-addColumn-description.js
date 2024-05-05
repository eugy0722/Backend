"use strict";

/** @type {import('sequelize-cli').Migration} */
const table = "businesses";
const column = "description";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn(table, column, Sequelize.STRING(100));
  },

  async down(queryInterface) {
    return await queryInterface.removeColumn(table, column);
  },
};

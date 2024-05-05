"use strict";

/** @type {import('sequelize-cli').Migration} */
const table = "businesses";
const column = "price";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(table, column, Sequelize.INTEGER);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(table, column);
  },
};

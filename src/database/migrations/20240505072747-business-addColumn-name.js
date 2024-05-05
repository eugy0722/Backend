"use strict";

/** @type {import('sequelize-cli').Migration} */
const table = "businesses";
const column = "name";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(table, column, {
      type: Sequelize.STRING(75),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(table, column);
  },
};

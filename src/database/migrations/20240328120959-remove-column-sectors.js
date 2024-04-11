"use strict";

const table = "sectors";
const column = "id_markets";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.removeColumn(table, column);
  },

  async down() {},
};

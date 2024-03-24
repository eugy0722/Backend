"use strict";
const table = "sectorizations";
const column = "id_sectorization";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn(table, column, {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.removeColumn(table, column);
  },
};

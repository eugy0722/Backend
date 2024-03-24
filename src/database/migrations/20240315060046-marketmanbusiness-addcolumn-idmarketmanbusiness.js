"use strict";
const table = "marketman_business";
const column = "id_marketmanbusiness";

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

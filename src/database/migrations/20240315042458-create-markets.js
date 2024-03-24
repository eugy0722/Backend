"use strict";

const table = "markets";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable(table, {
      id_market: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(65),
        allowNull: false,
        unique: true,
      },
      geo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    return await queryInterface.dropTable(table);
  },
};

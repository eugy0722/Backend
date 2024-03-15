"use strict";

const table = "sectors";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable(table, {
      id_sector: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
      id_markets: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "markets", key: "id_market" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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

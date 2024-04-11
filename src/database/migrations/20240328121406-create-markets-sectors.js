"use strict";

const table = "markets-sectors";
const models = [
  { name: "markets", key: "id_market" },
  { name: "sectors", key: "id_sector" },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable(table, {
      id_market_sector: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_market: {
        type: Sequelize.INTEGER,
        references: { model: models[0].name, key: models[0].key },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      id_sector: {
        type: Sequelize.INTEGER,
        references: { model: models[1].name, key: models[1].key },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    return await queryInterface.dropTable(table);
  },
};

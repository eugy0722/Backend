"use strict";

const table = "sectorizations";
const models = [
  { name: "sectors", key: "id_sector" },
  { name: "users", key: "id_user" },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable(table, {
      id_sector: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: models[0].name, key: models[0].key },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      id_marketman: {
        type: Sequelize.INTEGER,
        allowNull: false,
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

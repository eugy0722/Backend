"use strict";

const table = "marketman-business";
const models = [
  { name: "businesses", key: "id_business" },
  { name: "users", key: "id_user" },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable(table, {
      id_business: {
        type: Sequelize.INTEGER,
        references: { model: models[0].name, key: models[0].key },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      id_marketman: {
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

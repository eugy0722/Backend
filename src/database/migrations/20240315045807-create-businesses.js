"use strict";

const table = "businesses";
const model = { name: "sectors", key: "id_sector" };

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable(table, {
      id_business: {
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
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_sector: {
        type: Sequelize.INTEGER,
        references: { model: model.name, key: model.key },
        onDelete: "SET NULL",
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

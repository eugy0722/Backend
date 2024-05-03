"use strict";

/** @type {import('sequelize-cli').Migration}
 */

const table = "users";
const column = "avatar_image";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn(table, column, {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    return await queryInterface.removeColumn(table, column);
  },
};

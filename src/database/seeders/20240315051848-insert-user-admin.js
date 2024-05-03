"use strict";

const bcrypt = require("bcryptjs");
require("dotenv").config();

const salt = bcrypt.genSaltSync(8);
const table = "users";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      table,
      [
        {
          first_name: "Eugenio",
          last_name: "Kaxinga",
          username: "Eukaxinga",
          number_phone: "920349012",
          email: "ed072267@gmail.com",
          perfil: "Admin",
          password_hash: bcrypt.hashSync(process.env.PASSWORD_ADMIN, salt),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(table, null, {});
  },
};

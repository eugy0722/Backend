import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

// User Model
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        // All fields model
        id_user: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        number_phone: Sequelize.STRING,
        perfil: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
      },
      {
        sequelize,
        freezeTableName: "users",
        tableName: "users",
      }
    );

    // addHook method before save that encrypt password to save in the database
    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        // Encrypt password to store in password-hash
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    // return this class
    return this;
  }

  // Check Password Function to login
  checkPassword(password) {
    // Compare password and password-hash: true || false
    return bcrypt.compare(password, this.password_hash);
  }
}

// exports default user class
export default User;

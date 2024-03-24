import { Sequelize, Model } from "sequelize";

// Business Model
class Business extends Model {
  static init(sequelize) {
    super.init(
      {
        // All fields model
        id_business: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING,
        type: Sequelize.STRING,
      },
      {
        sequelize,
        freezeTableName: "businesses",
        tableName: "businesses",
      }
    );
    // return this class
    return this;
  }

  // Associate methods
  static associate(models) {
    // Associate to models Sector with Foreign Key id_sector
    this.belongsTo(models.Sector, { foreignKey: "id_sector" });
  }
}

// exports default Business class
export default Business;

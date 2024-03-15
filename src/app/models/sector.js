import { Sequelize, Model } from "sequelize";

// User Model
class Sector extends Model {
  static init(sequelize) {
    super.init(
      {
        // All fields model
        id_sector: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING,
      },
      {
        sequelize,
        freezeTableName: "sectors",
        tableName: "sectors",
      }
    );
    // return this class
    return this;
  }

  // Associate methods
  static associate(models) {
    // Associate to models Market with Foreign Key id_market
    this.belongsTo(models.Market, { foreignKey: "id_market" });
  }
}

// exports default Sector class
export default Sector;

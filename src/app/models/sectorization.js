import { Sequelize, Model } from "sequelize";

// Sectorization Model
class Sectorization extends Model {
  static init(sequelize) {
    super.init(
      {
        // All fields model
        id_sectorization: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      {
        sequelize,
        freezeTableName: "sectorizations",
        tableName: "sectorizations",
      }
    );
    // return this class
    return this;
  }

  // Associate methods
  static associate(models) {
    this.belongsTo(models.Sector, { foreignKey: "id_sector" });
    this.belongsTo(models.User, { foreignKey: "id_user" });
  }
}

// exports default Sectorization class
export default Sectorization;

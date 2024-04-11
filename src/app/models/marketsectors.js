import { Sequelize, Model } from "sequelize";

// MarketmanBusiness Model
class MarketSector extends Model {
  static init(sequelize) {
    super.init(
      {
        // All fields model
        id_marketsectors: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      {
        sequelize,
        freezeTableName: "markets-sectors",
        tableName: "markets-sectors",
      }
    );
    // return this class
    return this;
  }

  // Associate methods
  static associate(models) {
    this.belongsTo(models.Business, { foreignKey: "id_market" });
    this.belongsTo(models.User, { foreignKey: "id_sector" });
  }
}

// exports default MarketmanBusiness class
export default MarketSector;

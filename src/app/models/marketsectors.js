import { Sequelize, Model } from "sequelize";

// MarketSector Model
class MarketSector extends Model {
  static init(sequelize) {
    super.init(
      {
        // All fields model
        id_market_sector: {
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
    this.belongsTo(models.Market, { foreignKey: "id_market" });
    this.belongsTo(models.Sector, { foreignKey: "id_sector" });
  }
}

// exports default MarketmanBusiness class
export default MarketSector;

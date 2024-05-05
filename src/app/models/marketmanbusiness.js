import { Sequelize, Model } from "sequelize";

// MarketmanBusiness Model
class MarketmanBusiness extends Model {
  static init(sequelize) {
    super.init(
      {
        // All fields model
        id_marketman_business: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      {
        sequelize,
        freezeTableName: "marketman-business",
        tableName: "marketman-business",
      }
    );
    // return this class
    return this;
  }

  // Associate methods
  static associate(models) {
    this.belongsTo(models.Business, { foreignKey: "id_business" });
    this.belongsTo(models.User, { foreignKey: "id_marketman" });
  }
}

// exports default MarketmanBusiness class
export default MarketmanBusiness;

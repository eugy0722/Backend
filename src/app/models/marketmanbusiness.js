import { Sequelize, Model } from "sequelize";

// MarketmanBusiness Model
class MarketmanBusiness extends Model {
  static init(sequelize) {
    super.init(
      {
        // All fields model
        id_marketmanbusiness: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      {
        sequelize,
        freezeTableName: "marketman_business",
        tableName: "marketman_business",
      }
    );
    // return this class
    return this;
  }

  // Associate methods
  static associate(models) {
    this.belongsTo(models.Business, { foreignKey: "id_business" });
    this.belongsTo(models.User, { foreignKey: "id_user" });
  }
}

// exports default MarketmanBusiness class
export default MarketmanBusiness;

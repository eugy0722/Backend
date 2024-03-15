import Sequelize, { Model } from "sequelize";

// Market Model
class Market extends Model {
  static init(sequelize) {
    super.init(
      {
        // All fields model
        id_market: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: Sequelize.STRING,
        geo: Sequelize.INTEGER,
      },
      {
        sequelize,
        freezeTableName: "markets",
        tableName: "markets",
      }
    );
    // return this class
    return this;
  }
}

// exports default market class
export default Market;

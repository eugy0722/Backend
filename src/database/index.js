// File to connect database and models
import Sequelize from "sequelize";

import User from "../app/models/user";
import Market from "../app/models/market";
import Sector from "../app/models/sector";
import MarketmanBusiness from "../app/models/marketmanbusiness";
import Business from "../app/models/business";
import Sectorization from "../app/models/sectorization";
import dbConfig from "../config/config";
import MarketSector from "../app/models/marketsectors";

// An Array that group all models
const models = [
  User,
  Market,
  Sector,
  Business,
  Sectorization,
  MarketmanBusiness,
  MarketSector,
];

// Database class to connect database and models
class Database {
  constructor() {
    // Initializete method statements
    this.init();
  }

  // Initializete method
  init() {
    // Create sequelize connection with database
    this.connection = new Sequelize(dbConfig);
    // Connect all models with database
    models
      .map((model) => model.init(this.connection))
      // Connect all models associations with what has
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();

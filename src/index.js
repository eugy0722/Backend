import express from "express";
import cors from "cors";

import routes from "./routes";
import "./database";

// Index class is responsable for tasks like use middlewares and routes
class Index {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  // Middleware method to use middlewares function
  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  // Routes method to use routes function
  routes() {
    this.app.use(routes);
  }
}

module.exports = new Index().app;

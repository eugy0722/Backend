import express from "express";
import cors from "cors";
import path from "path";

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
    this.app.use(
      "/user/avatar",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
    this.app.use(cors());
  }

  // Routes method to use routes function
  routes() {
    this.app.use(routes);
  }
}

module.exports = new Index().app;

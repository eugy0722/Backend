import { Router } from "express";

import SessionController from "./app/controllers/SessionController";

// An instence of the Router
const routes = new Router();

// The routes
/* 
Remember that the order of the routes matter when, it's being used middlewares 
*/

// To test routes, only authenticated user
routes.get("/test", (req, res) => {
  res.json({ message: "OK!" }).status(200);
});

// To login
routes.post("/login", SessionController.session);

module.exports = routes;

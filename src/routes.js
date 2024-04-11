import { Router } from "express";

import SessionController from "./app/controllers/SessionController";
import UserController from "./app/controllers/UserController";
import MarketController from "./app/controllers/MarketController";
import SectorController from "./app/controllers/SectorController";
import BusinessController from "./app/controllers/BusinessController";

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

// To register Users
routes.post("/user/register", UserController.store);

// To Read Users
routes.get("/user/find/all", UserController.findAll);

// To Read User
routes.get("/user/find/:id_user", UserController.detailsUser);

// To Update User
routes.post("/user/update/:id_user", UserController.updatedUser);

// To Delete User
routes.get("/user/delete/:id_user", UserController.destroyUser);

// To register Markets
routes.post("/market/register", MarketController.store);

// To Read Markets
routes.get("/market/find/all", MarketController.findAll);

// To Read Market
routes.get("/market/find/:id_market", MarketController.detailsMarket);

// To Update Market
routes.post("/market/update/:id_market", MarketController.updatedMarket);

// To Delete Market
routes.get("/market/delete/:id_market", MarketController.destroyMarket);

// To register Sectors
routes.post("/sector/register", SectorController.store);

// To Read Sectors
routes.get("/sector/find/all", SectorController.findAll);

// To Read Sector
routes.get("/sector/find/:id_sector", SectorController.detailsSector);

// To Update Sector
routes.post("/sector/update/:id_sector", SectorController.updatedSector);

// To Delete Sector
routes.get("/sector/delete/:id_sector", SectorController.destroySector);

// To register Business
routes.post("/business/register", BusinessController.store);

// To Read Business
routes.get("/business/find/all", BusinessController.findAll);

// To Read Business
routes.get("/business/find/:id_business", BusinessController.detailsBusiness);

// To Update Business
routes.post(
  "/business/update/:id_business",
  BusinessController.updatedBusiness
);

// To Delete Business
routes.get("/business/delete/:id_business", BusinessController.destroyBusiness);

module.exports = routes;

import { Router } from "express";
import multer from "multer";

// import authMiddlewares from "./app/middlewares/auth";

import multerConfig from "./config/multer";
import SessionController from "./app/controllers/SessionController";
import UserController from "./app/controllers/UserController";
import MarketController from "./app/controllers/MarketController";
import SectorController from "./app/controllers/SectorController";
import BusinessController from "./app/controllers/BusinessController";
import AvatarImageController from "./app/controllers/AvatarImageController";
import MarketSectorController from "./app/controllers/Market-SectorController";
import SectorizationController from "./app/controllers/SectorizationController";
import BusinessPerSectorsController from "./app/controllers/BusinessPerSectorsController";
import MarketmanBusinessesController from "./app/controllers/MarketmanBusinessesController";

// An instence of the Router
const routes = new Router();

const upload = multer(multerConfig);

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

// Create an user Sectorizated
routes.post("/user/sectorization/register", SectorizationController.store);

// To Read Users Sectorizated
routes.get("/user/sectorization/:id_sector", SectorizationController.findAll);

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

// To register MarketSector
routes.post("/marketsectors/register", MarketSectorController.store);

// To Read Markets Relations
routes.get("/marketsectors/find/all/:idMarket", MarketSectorController.findAll);

// Delete Markets Relations
routes.get(
  "/marketsectors/delete/:id_market_sector",
  MarketSectorController.destroyMarketSector
);

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

// Get Products per Sector
routes.get("/sector/:id_sector/products", SectorController.BusinessesPerSector);

// To register Business
routes.post("/business/register", BusinessController.store);

// To Read Business
routes.get("/business/find/all", BusinessController.findAll);

// To Read Business
routes.get("/business/find/:id_business", BusinessController.detailsBusiness);

// Get Products per Sector
routes.get(
  "/business/sector/:id_sector",
  BusinessPerSectorsController.BusinessesPerSector
);

// To Update Business
routes.post(
  "/business/update/:id_business",
  BusinessController.updatedBusiness
);

// To Delete Business
routes.get("/business/delete/:id_business", BusinessController.destroyBusiness);

// Register your commodities
routes.post("/marketmanbusiness/register", MarketmanBusinessesController.store);

// Search your commodities
routes.post(
  "/marketmanbusiness/exactsearch",
  MarketmanBusinessesController.ExactCommodityBelongTo
);

// Search a commodity
routes.post(
  "/marketmanbusiness/similarsearch",
  MarketmanBusinessesController.SimilarCommodityBelongTo
);

// Search commodities with filter
routes.get(
  "/marketmanbusiness/search/filter",
  MarketmanBusinessesController.CommoditySearchWithFilter
);

// routes.use(authMiddlewares);

// To upload image
routes.put(
  "/user/avatar",
  upload.single("file"),
  AvatarImageController.update_avatar_image
);

module.exports = routes;

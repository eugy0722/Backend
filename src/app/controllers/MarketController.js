import * as Yup from "yup";
import { Op } from "sequelize";

import Market from "../models/market";

// Class Market Controller
class MarketController {
  // Register Market -- CREATE
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().max(65),
      latitude: Yup.string().required(),
      logitude: Yup.string().required(),
    });

    if (!schema.isValid(req.body)) {
      return res.status(400).json({ error: "Validation fails!" });
    }

    const MarketExists = await Market.findOne({
      attributes: ["id_market"],
      where: {
        name: req.body.name,
        latitude: req.body.latitude,
        logitude: req.body.logitude,
      },
    });

    if (MarketExists) {
      return res.status(400).json({ error: "Market already exists" });
    }

    const { id_market, name, latitude, logitude } = await Market.create(
      req.body
    );

    return res.json({
      id_market,
      name,
      latitude,
      logitude,
    });
  }
  // Search the Markets -- READ
  async findAll(req, res) {
    const markets = await Market.findAll({
      order: ["name"],
      attributes: ["id_market", "name", "latitude", "logitude"],
    });

    return res.status(200).json(markets);
  }
  // Search an Market -- READ
  async detailsMarket(req, res) {
    const market = await Market.findOne({
      where: {
        id_market: req.params.id_market,
      },
      attributes: ["id_market", "name", "latitude", "logitude"],
    });

    if (!market) {
      return res.status(400).json({ error: "Market not exists!" });
    }

    return res.status(200).json(market);
  }
  // Update Market -- UPDATE
  async updatedMarket(req, res) {
    const { name, latitude, logitude } = req.body;

    try {
      if (name) {
        const MarketExists = await Market.findOne({
          attributes: ["id_market"],
          where: {
            name: req.body.name,
          },
        });
        if (MarketExists)
          return res.status(400).json({ error: "Market already exists" });

        await Market.update(
          { name },
          { where: { id_market: req.params.id_market } }
        );
      }

      if (latitude) {
        const MarketExists = await Market.findOne({
          attributes: ["id_market"],
          where: {
            latitude: req.body.latitude,
          },
        });
        if (MarketExists)
          return res.status(400).json({ error: "Market already exists" });

        await Market.update(
          { latitude },
          { where: { id_market: req.params.id_market } }
        );
      }

      if (logitude) {
        const MarketExists = await Market.findOne({
          attributes: ["id_market"],
          where: {
            latitude: req.body.logitude,
          },
        });
        if (MarketExists)
          return res.status(400).json({ error: "Market already exists" });

        await Market.update(
          { logitude },
          { where: { id_market: req.params.id_market } }
        );
      }
    } catch {
      return res.json({ error: "Update fails" }).status(400);
    }

    return res.status(200).json({ message: "Updated Successfully" });
  }
  // Destroy Market -- DELETE
  async destroyMarket(req, res) {
    try {
      await Market.destroy({
        where: {
          id_market: req.params.id_market,
        },
      });

      return res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default new MarketController();

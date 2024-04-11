import * as Yup from "yup";
import { Op } from "sequelize";

import Market from "../models/market";

// Class Market Controller
class MarketController {
  // Register Market -- CREATE
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().max(65),
      geo: Yup.number().required(),
    });

    if (!schema.isValid(req.body)) {
      return res.status(400).json({ error: "Validation fails!" });
    }

    const MarketExists = await Market.findOne({
      attributes: ["id_market"],
      where: {
        [Op.or]: {
          name: req.body.name,
          geo: req.body.geo,
        },
      },
    });

    if (MarketExists) {
      return res.status(400).json({ error: "Market already exists" });
    }

    const { id_market, name, geo } = await Market.create(req.body);

    return res.json({
      id_market,
      name,
      geo,
    });
  }
  // Search the Markets -- READ
  async findAll(req, res) {
    const markets = await Market.findAll({
      order: ["name"],
      attributes: ["id_market", "name", "geo"],
    });

    return res.status(200).json(markets);
  }
  // Search an Market -- READ
  async detailsMarket(req, res) {
    const market = await Market.findOne({
      where: {
        id_market: req.params.id_market,
      },
      attributes: ["id_market", "name", "geo"],
    });

    if (!market) {
      return res.status(400).json({ error: "Market not exists!" });
    }

    return res.status(200).json(market);
  }
  // Update Market -- UPDATE
  async updatedMarket(req, res) {
    const { name, geo } = req.body;

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

      if (geo) {
        const MarketExists = await Market.findOne({
          attributes: ["id_market"],
          where: {
            geo: req.body.geo,
          },
        });
        if (MarketExists)
          return res.status(400).json({ error: "Market already exists" });

        await Market.update(
          { geo },
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

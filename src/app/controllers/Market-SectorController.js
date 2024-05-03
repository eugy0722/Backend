import * as Yup from "yup";
import { Op } from "sequelize";

// import models
import MarketSector from "../models/marketsectors";
import Market from "../models/market";
import Sector from "../models/sector";

// Class MarketSector Controller
class MarketSectorController {
  // Register MarketSector -- CREATE
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        id_market: Yup.number().required(),
        id_sector: Yup.number().required(),
      });

      if (!schema.isValid(req.body)) {
        return res.status(400).json({ error: "Validation fails!" });
      }

      const marketDesire = await Market.findOne({
        attributes: ["id_market"],
        where: {
          id_market: req.body.id_market,
        },
      });

      if (!marketDesire) {
        return res.status(401).json({ error: "Mercado nao encontrado" });
      }

      const sectorDesire = await Sector.findOne({
        attributes: ["id_sector"],
        where: {
          id_sector: req.body.id_sector,
        },
      });

      if (!sectorDesire) {
        return res.status(401).json({ error: "Sector não encontrado" });
      }

      const { id_market } = marketDesire;
      const { id_sector } = sectorDesire;

      const RelationExists = await MarketSector.findOne({
        attributes: ["id_market_sector"],
        where: {
          id_market,
          id_sector,
        },
      });

      if (RelationExists) {
        return res
          .status(409)
          .json({ error: "A Relacão entre os registros já existe" });
      }

      const { id_market_sector } = await MarketSector.create({
        id_market,
        id_sector,
      });

      return res
        .json({
          id_market_sector,
        })
        .status(200);
    } catch (err) {
      console.log(err);
    }
  }
  // Search the MarketSector -- READ
  async findAll(req, res) {
    const relations = await MarketSector.findAll({
      raw: true,
      where: {
        id_market: req.params.idMarket,
      },
      attributes: ["id_market_sector", "id_market"],
      include: [
        {
          model: Sector,
          required: true,
          attributes: ["name"],
        },
      ],
    });

    return res.status(200).json(relations);
  }
  // Search an MarketSector -- READ
  async detailsMarketSector(req, res) {
    const Relation = await MarketSector.findOne({
      where: {
        id_user: req.params.id_user || req.idUser,
      },
      attributes: [
        "id_user",
        "username",
        "email",
        "number_phone",
        "first_name",
        "last_name",
        "perfil",
      ],
    });

    if (!user) {
      return res.status(400).json({ error: "User not exists!" });
    }

    return res.status(200).json(user);
  }
  // Update MarketSector -- UPDATE
  async updatedMarketSector(req, res) {}

  // Destroy MarketSector -- DELETE
  async destroyMarketSector(req, res) {
    try {
      await MarketSector.destroy({
        where: {
          id_market_sector: req.params.id_market_sector,
        },
      });

      return res.status(200).json({ message: "Deletedo com Successo" });
    } catch (error) {
      return res.json({ message: "Falha na requisicao" });
    }
  }
}

export default new MarketSectorController();

import * as Yup from "yup";
import { Op } from "sequelize";

import User from "../models/user";
import Business from "../models/business";
import MarketmanBusiness from "../models/marketmanbusiness";

// Class MarketmanBusinesses User Controller
class MarketmanBusinessesController {
  // Register MarketmanBusinesses User -- CREATE
  async store(req, res) {
    const schema = Yup.object().shape({
      id_business: Yup.number().required(),
      id_marketman: Yup.number().required(),
    });

    if (!schema.isValid(req.body)) {
      return res.status(400).json({ error: "Validação falhou!" });
    }

    const userDesire = await User.findOne({
      attributes: ["id_user", "perfil"],
      where: {
        id_user: req.body.id_marketman,
      },
    });

    if (!userDesire) {
      return res.status(401).json({ error: "Utilizidor não encontrado" });
    }

    const businessDesire = await Business.findOne({
      attributes: ["id_business"],
      where: {
        id_business: req.body.id_business,
      },
    });

    if (!businessDesire) {
      return res.status(401).json({ error: "Negócio não encontrado" });
    }

    const { id_user, perfil } = userDesire;
    const { id_business } = businessDesire;

    if (perfil === "Consumidor" || perfil === "Administrador") {
      return res.status(401).json({ erro: "Perfil de Utilizidor restrigido" });
    }

    const RelationExists = await MarketmanBusiness.findOne({
      attributes: ["id_marketman_business"],
      where: {
        id_business: id_business,
        id_marketman: id_user,
      },
    });

    if (RelationExists) {
      return res
        .status(409)
        .json({ Mensagem: "A Relação entre os registros já existe" });
    }

    const { id_marketman_business } = await MarketmanBusiness.create({
      id_business: id_business,
      id_marketman: id_user,
    });

    return res
      .json({
        id_marketman_business,
      })
      .status(200);
  }
  // Search the Commodities Belong To User -- READ
  async CommoditiesBelongTo(req, res) {
    const relations = await MarketmanBusiness.findAll({
      raw: true,
      where: {
        id_marketman: req.params.id_marketman,
      },
      attributes: ["id_business"],
      include: [
        {
          model: Business,
          required: true,
          attributes: ["name", "type", "description"],
        },
      ],
    });

    return res.status(200).json(relations);
  }

  // Similar Search the Commodity Belong To Users -- READ
  async SimilarCommodityBelongTo(req, res) {
    const relations = await MarketmanBusiness.findAll({
      raw: true,
      where: {},
      attributes: ["id_marketman_business"],
      include: [
        {
          model: Business,
          required: true,
          attributes: ["name", "type", "description", "price"],
          where: {
            name: {
              [Op.like]: `%${req.body.search}%`,
            },
          },
        },
        {
          model: User,
          required: true,
          attributes: ["username", "perfil", "number_phone"],
        },
      ],
    });
    const search = [];
    var i = 0;

    relations.map((relation) => {
      search[i] = {
        id_relation: relation["id_marketman_business"],
        businessname: relation["Business.name"],
        businesstype: relation["Business.type"],
        businessdescription: relation["Business.description"],
        price: relation["Business.price"],
        username: relation["User.username"],
        perfil: relation["User.perfil"],
        number_phone: relation["User.number_phone"],
      };
      i++;
    });

    return res.status(200).json(search);
  }

  // Exact Search the Commodity Belong To Users -- READ
  async ExactCommodityBelongTo(req, res) {
    const relations = await MarketmanBusiness.findAll({
      raw: true,
      where: {},
      attributes: ["id_marketman_business"],
      include: [
        {
          model: Business,
          required: true,
          attributes: ["name", "type", "description", "price"],
          where: {
            name: {
              [Op.like]: `${req.body.search}`,
            },
          },
        },
        {
          model: User,
          required: true,
          attributes: ["username", "perfil", "number_phone"],
        },
      ],
    });
    const search = [];
    var i = 0;

    relations.map((relation) => {
      search[i] = {
        id_relation: relation["id_marketman_business"],
        businessname: relation["Business.name"],
        businesstype: relation["Business.type"],
        businessdescription: relation["Business.description"],
        price: relation["Business.price"],
        username: relation["User.username"],
        perfil: relation["User.perfil"],
        number_phone: relation["User.number_phone"],
      };
      i++;
    });

    return res.status(200).json(search);
  }

  // Search the Commodity Belong To Users with filter -- READ
  async CommoditySearchWithFilter(req, res) {
    const relations = await MarketmanBusiness.findAll({
      raw: true,
      where: {},
      attributes: [],
      include: [
        {
          model: Business,
          required: true,
          attributes: ["name", "type", "description"],
          where: {
            type: req.body.filter,
          },
        },
        {
          model: User,
          required: true,
          attributes: ["username", "perfil", "number_phone"],
        },
      ],
    });

    return res.status(200).json(relations);
  }

  // Search an MarketmanBusiness -- READ
  async detailsMarketmanBusiness(req, res) {}
  // Update MarketmanBusiness -- UPDATE
  async updatedMarketmanBusiness(req, res) {}
  // Destroy MarketmanBusiness -- DELETE
  async destroyMarketmanBusiness(req, res) {
    try {
      await MarketmanBusiness.destroy({
        where: {
          id_marketman_business: req.params.id_marketman_business,
        },
      });

      return res.status(200).json({ message: "Deletedo com Successo" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default new MarketmanBusinessesController();

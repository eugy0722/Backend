import * as Yup from "yup";
import { Op } from "sequelize";

import Business from "../models/business";
import Sector from "../models/sector";

// Class Business Controller
class BusinessController {
  // Register Business -- CREATE
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().max(40),
      type: Yup.number().required(),
      description: Yup.string().max(100),
      id_sector: Yup.number(),
      price: Yup.number(),
    });

    if (!schema.isValid(req.body)) {
      return res.status(400).json({ error: "Falha na validacao!" });
    }

    // const BusinessExists = await Business.findOne({
    //   attributes: ["id_business"],
    //   where: {
    //     [Op.or]: {
    //       descri: req.body.name,
    //     },
    //   },
    // });

    // if (BusinessExists) {
    //   return res.status(400).json({ error: "Este Negocio ja existe" });
    // }

    const { id_business, name, type, id_sector, description, price } =
      await Business.create(req.body);

    return res.json({
      id_business,
      name,
      type,
      id_sector,
      description,
      price,
    });
  }
  // Search the Businesses -- READ
  async findAll(req, res) {
    const businesses = await Business.findAll({
      order: ["name"],
      attributes: [
        "id_business",
        "name",
        "type",
        "description",
        "id_sector",
        "price",
      ],
    });

    return res.status(200).json(businesses);
  }

  // Search an Business -- READ
  async detailsBusiness(req, res) {
    const business = await Business.findOne({
      where: {
        id_business: req.params.id_business,
      },
      attributes: [
        "id_business",
        "name",
        "description",
        "type",
        "id_sector",
        "price",
      ],
    });

    if (!business) {
      return res.status(400).json({ error: "Este Negocio nao existe" });
    }

    return res.status(200).json(business);
  }

  // Update Business -- UPDATE
  async updatedBusiness(req, res) {
    const { name, type, description, price } = req.body;

    try {
      if (name) {
        await Business.update(
          { name },
          { where: { id_business: req.params.id_business } }
        );
      }

      if (type) {
        await Business.update(
          { type },
          { where: { id_business: req.params.id_business } }
        );
      }

      if (price) {
        await Business.update(
          { price },
          { where: { id_business: req.params.id_business } }
        );
      }

      if (description) {
        await Business.update(
          { description },
          { where: { id_business: req.params.id_business } }
        );
      }
    } catch {
      return res.json({ error: "Actualicao falhou" }).status(400);
    }

    return res.status(200).json({ message: "Actualizado com sucesso" });
  }
  // Destroy Business -- DELETE
  async destroyBusiness(req, res) {
    try {
      await Business.destroy({
        where: {
          id_business: req.params.id_business,
        },
      });

      return res.status(200).json({ mensagem: "Deletedo com sucesso" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default new BusinessController();

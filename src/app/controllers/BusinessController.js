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
      id_sector: Yup.number(),
    });

    if (!schema.isValid(req.body)) {
      return res.status(400).json({ error: "Validation fails!" });
    }

    const BusinessExists = await Business.findOne({
      attributes: ["id_business"],
      where: {
        [Op.or]: {
          name: req.body.name,
          type: req.body.type,
        },
      },
    });

    if (BusinessExists) {
      return res.status(400).json({ error: "Business already exists" });
    }

    const { id_business, name, type, id_sector } = await Business.create(
      req.body
    );

    return res.json({
      id_business,
      name,
      type,
      id_sector,
    });
  }
  // Search the Businesses -- READ
  async findAll(req, res) {
    const businesses = await Business.findAll({
      order: ["name"],
      attributes: ["id_business", "name", "type", "id_sector"],
    });

    return res.status(200).json(businesses);
  }
  
  // Search an Business -- READ
  async detailsBusiness(req, res) {
    const business = await Business.findOne({
      where: {
        id_business: req.params.id_business,
      },
      attributes: ["id_business", "name", "type", "id_sector"],
    });

    if (!business) {
      return res.status(400).json({ error: "Business not exists!" });
    }

    return res.status(200).json(business);
  }

  // Search Businesses per Sector-- READ
  async BusinessesPerSector(req, res) {
    const Relations = await Business.findAll({
      raw: true,
      attributes: ['name', 'type'],
      include: [{
        model: Sector,
        required: true,
        attributes: ['name']
      }],
      order: [['name', 'ASC']]
    });

    if (!Relations) {
      return res.status(404).json({ error: "Este Sector nao tem productos!" });
    }

    return res.status(200).json(Relations);
  }

  // Update Business -- UPDATE
  async updatedBusiness(req, res) {
    const { name, type } = req.body;

    try {
      if (name) {
        const BusinessExists = await Business.findOne({
          attributes: ["id_business"],
          where: {
            name: req.body.name,
          },
        });
        if (BusinessExists)
          return res.status(400).json({ error: "Business already exists" });

        await Business.update(
          { name },
          { where: { id_business: req.params.id_business } }
        );
      }

      if (type) {
        const BusinessExists = await Business.findOne({
          attributes: ["id_business"],
          where: {
            type: req.body.type,
          },
        });
        if (BusinessExists)
          return res.status(400).json({ error: "Business already exists" });

        await Business.update(
          { type },
          { where: { id_business: req.params.id_business } }
        );
      }
    } catch {
      return res.json({ error: "Update fails" }).status(400);
    }

    return res.status(200).json({ message: "Updated Successfully" });
  }
  // Destroy Business -- DELETE
  async destroyBusiness(req, res) {
    try {
      await Business.destroy({
        where: {
          id_business: req.params.id_business,
        },
      });

      return res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default new BusinessController();

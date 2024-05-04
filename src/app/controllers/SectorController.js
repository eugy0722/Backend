import * as Yup from "yup";
import { Op } from "sequelize";

import Sector from "../models/sector";
import Business from "../models/business";

// Class Sector Controller
class SectorController {
  // Register Sector -- CREATE
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().max(40),
    });

    if (!schema.isValid(req.body)) {
      return res.status(400).json({ error: "Validation fails!" });
    }

    const SectorExists = await Sector.findOne({
      attributes: ["id_sector"],
      where: {
        [Op.or]: {
          name: req.body.name,
        },
      },
    });

    if (SectorExists) {
      return res.status(400).json({ error: "Sector already exists" });
    }

    const { id_sector, name } = await Sector.create(req.body);

    return res.json({
      id_sector,
      name,
    });
  }
  // Search the Sector -- READ
  async findAll(req, res) {
    const sectors = await Sector.findAll({
      order: ["name"],
      attributes: ["id_sector", "name"],
    });

    return res.status(200).json(sectors);
  }
  // Search an Sector -- READ
  async detailsSector(req, res) {
    const sector = await Sector.findOne({
      where: {
        id_sector: req.params.id_sector,
      },
      attributes: ["id_sector", "name"],
    });

    if (!sector) {
      return res.status(400).json({ error: "Sector not exists!" });
    }

    return res.status(200).json(sector);
  }

  // Search Businesses per Sector
  async BusinessesPerSector(req, res) {
    const Relations = await Sector.findAll({
      raw: true,
      where: {
        id_sector: req.params.id_sector,
      },
      attributes: ["id_sector", "name"],
      include: [
        {
          model: Business,
          required: true,
          attributes: ["name", "type"],
        },
      ],
      order: [["name", "ASC"]],
    });

    if (!Relations) {
      return res.status(404).json({ error: "Este Sector não tem productos!" });
    }

    return res.status(200).json(Relations);
  }

  // Update Sector -- UPDATE
  async updatedSector(req, res) {
    const { name } = req.body;

    try {
      if (name) {
        const SectorExists = await Sector.findOne({
          attributes: ["id_sector"],
          where: {
            name: req.body.name,
          },
        });
        if (SectorExists)
          return res.status(400).json({ error: "Sector already exists" });

        await Sector.update(
          { name },
          { where: { id_sector: req.params.id_sector } }
        );
      }
    } catch {
      return res.json({ error: "Update fails" }).status(400);
    }

    return res.status(200).json({ message: "Updated Successfully" });
  }
  // Destroy Sector -- DELETE
  async destroySector(req, res) {
    try {
      await Sector.destroy({
        where: {
          id_sector: req.params.id_sector,
        },
      });

      return res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default new SectorController();

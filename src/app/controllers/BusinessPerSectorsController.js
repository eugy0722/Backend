import * as Yup from "yup";
import { Op } from "sequelize";

import Business from "../models/business";
import Sector from "../models/sector";

// Class Businesses per Sector Controller
class BusinessesPerSectorController {
  // Search Businesses per Sector-- READ
  async BusinessesPerSector(req, res) {
    const Relations = await Business.findAll({
      raw: true,
      attributes: ["id_business", "name", "type", "description"],
      where: {
        id_sector: req.params.id_sector,
      },
      include: [
        {
          model: Sector,
          required: true,
          attributes: ["name"],
        },
      ],
      order: [["name", "ASC"]],
    });

    if (!Relations) {
      return res
        .status(404)
        .json({ Mensagem: "Este Sector não tem productos!" });
    }

    return res.status(200).json(Relations);
  }
}

export default new BusinessesPerSectorController();

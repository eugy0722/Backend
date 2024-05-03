import { Op } from "sequelize";
import User from "../models/user";

export default async (req, res, next) => {
  const isAdmin = await User.findOne({
    where: {
      [Op.and]: {
        id_user: idUser,
        perfil: "admin",
      },
    },
  });

  if (!isAdmin) {
    return res.status(401).json({ error: "Não têm permissão de acesso" });
  }

  return next();
};

import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../../config/auth";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "É preciso um token de authenticação" });
  }

  const [, token] = authHeader.split(" ");
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.idUser = decoded.id_user;

    const idUser = req.idUser;
    console.log(idUser);

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token está inválido" });
  }
};

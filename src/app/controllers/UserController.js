import * as Yup from "yup";
import { Op } from "sequelize";

import User from "../models/user";

// Class User Controller
class UserController {
  // Register User -- CREATE
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        first_name: Yup.string().required().max(30),
        last_name: Yup.string().required().max(30),
        username: Yup.string().required().max(30),
        email: Yup.string().email().required().max(75),
        number_phone: Yup.string().required().min(9),
        password: Yup.string().required().min(8).max(100),
        perfil: Yup.string().required(),
      });

      if (!schema.isValid(req.body)) {
        return res.status(400).json({ error: "Validation fails!" });
      }

      const UserExists = await User.findOne({
        attributes: ["id_user"],
        where: {
          [Op.or]: {
            number_phone: req.body.number_phone,
            email: req.body.email,
          },
        },
      });

      if (UserExists) {
        return res.status(400).json({ error: "User already exists" });
      }

      const { id_user, username, email } = await User.create(req.body);

      return res.json({
        id_user,
        username,
        email,
      });
    } catch (err) {
      console.log(err);
    }
  }
  // Search the users -- READ
  async findAll(req, res) {
    const users = await User.findAll({
      where: {},
      order: ["username"],
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

    return res.status(200).json(users);
  }
  // Search an user -- READ
  async detailsUser(req, res) {
    const user = await User.findOne({
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
  // Update user -- UPDATE
  async updatedUser(req, res) {
    const { username, first_name, last_name, number_phone, email, perfil } =
      req.body;

    try {
      if (perfil) {
        await User.update(
          { perfil },
          { where: { id_user: req.params.id_user || req.idUser } }
        );
      }
      if (username) {
        await User.update(
          { username },
          { where: { id_user: req.params.id_user || req.idUser } }
        );
      }
      if (first_name) {
        await User.update(
          { first_name },
          { where: { id_user: req.params.id_user || req.idUser } }
        );
      }
      if (last_name) {
        await User.update(
          { last_name },
          { where: { id_user: req.params.id_user || req.idUser } }
        );
      }
      if (number_phone) {
        const UserExists = await User.findOne({
          attributes: ["id_user"],
          where: {
            number_phone: req.body.number_phone,
          },
        });

        if (UserExists)
          return res.status(400).json({ error: "User already exists" });

        await User.update(
          { number_phone },
          { where: { id_user: req.params.id_user || req.idUser } }
        );
      }
      if (email) {
        const UserExists = await User.findOne({
          attributes: ["id_user"],
          where: {
            email: req.body.email,
          },
        });

        if (UserExists)
          return res.status(400).json({ error: "User already exists" });

        await User.update(
          { email },
          { where: { id_user: req.params.id_user || req.idUser } }
        );
      }
    } catch {
      return res.json({ error: "Update fails" }).status(400);
    }

    return res.status(200).json({ message: "Updated Successfully" });
  }
  // Destroy user -- DELETE
  async destroyUser(req, res) {
    try {
      await User.destroy({
        where: {
          id_user: req.params.id_user || req.idUser,
        },
      });

      return res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default new UserController();

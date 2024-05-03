// Third Part Library Importion
import jwt from "jsonwebtoken";
import * as Yup from "yup";
// My modules Importion
import User from "../models/user";
import authConfig from "../../config/auth";

//Class Session Controller
class SessionController {
  // View Session Function
  async session(req, res) {
    // Schema of the entry
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    // Validation of the entry
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validations fails!" });
    }
    // Data Entry email and password
    const { email, password } = req.body;

    // Verification of the email existence
    const user = await User.findOne({
      where: {
        email: email,
      },
      attributes: [
        "id_user",
        "username",
        "perfil",
        "password_hash",
        "first_name",
        "last_name",
        "avatar_image",
      ],
    });

    // If no user
    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }
    // If password doesn't match with the user
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password doesn't match!" });
    }

    // Return data and token to login
    const { id_user, username, first_name, last_name, perfil, avatar_image } =
      user;
    const full_name = first_name + " " + last_name;
    return res
      .json({
        user: {
          id_user,
          username,
          full_name,
          email,
          perfil,
          avatar_image,
        },
        accessToken: jwt.sign({ id_user }, authConfig.secretAccess, {
          expiresIn: authConfig.expiresInA,
        }),
        refreshToken: jwt.sign({ id_user }, authConfig.secretRefresh, {
          expiresIn: authConfig.expiresInR,
        }),
      })
      .status(200);
  }
}

export default new SessionController();

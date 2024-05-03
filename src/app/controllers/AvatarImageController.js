import User from "../models/user";

class AvatarImageController {
  async update_avatar_image(req, res) {
    try {
      const { filename: avatar_image } = req.file;
      const user = await User.findByPk(req.idUser);
      const userData = await user.update({ avatar_image });

      return res.json(userData);
    } catch (error) {
      return res.json({ message: "Ocorreu um erro durante o upload!" });
    }
  }
}

export default new AvatarImageController();

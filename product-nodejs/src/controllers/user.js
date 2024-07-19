import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerValid, loginValid } from "../validations/user.js";

class UserController {
  async getUser(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async userRegister(req, res) {
    try {
      const { username, email, password, avatar } = req.body;
      const { error } = registerValid.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errorMessage = error.details.map((detail) => detail.message);
        return res.status(400).json({
          message: errorMessage,
        });
      }

      const emailValid = await User.findOne({ email });
      if (emailValid) {
        return res.status(400).json({
          message: "Email đã được đăng ký",
        });
      }

      const hashPassword = await bcryptjs.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashPassword,
        avatar,
      });
      return res.status(201).json({
        message: "Đăng ký thành công",
        newUser,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const { error } = loginValid.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errorMessage = error.details.map((detail) => detail.message);
        return res.status(400).json({
          message: errorMessage,
        });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Email chưa được đăng ký",
        });
      }

      const isPassword = await bcryptjs.compare(password, user.password);
      if (!isPassword) {
        return res.status(400).json({
          message: "Mật khẩu không đúng",
        });
      }

      const token = jwt.sign({ userId: user._id }, process.env.KEY, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        message: "Đăng nhập thành công",
        token,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}



export default UserController;

import jwt from "jsonwebtoken";
import User from "../models/user.js";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Vui lòng đăng nhập để tiếp tục" });
  }

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};

const checkUserInDB = async (req, res, next) => {
  try {
    const user = await User.findById(req.userData.userId);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export { verifyToken, checkUserInDB };

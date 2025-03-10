import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new Error("unAuthorize");
    }

    const decoded = await jwt.verify(token, process.env.JWTSECRET);
    if (!decoded) {
      throw new Error("unAuthorize user");
    }
    const { userId } = decoded;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error(" user not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid user md", error });
  }
};

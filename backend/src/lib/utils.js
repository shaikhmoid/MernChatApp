import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const jwtToken = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWTSECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

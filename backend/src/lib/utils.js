import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const jwtToken = async (userId, res) => {
  const token = await jwt.sign({ userId }, process.env.JWTSECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};

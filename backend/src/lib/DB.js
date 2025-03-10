import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default function connectDB() {
  mongoose
    .connect(process.env.MONGODBURL)
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log(err);
    });
}

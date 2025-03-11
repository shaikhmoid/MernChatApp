import express from "express";
import dotenv from "dotenv";
import auth from "./src/routes/auth.route.js";
import messages from "./src/routes/messages.route.js";
import connectDB from "./src/lib/DB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./src/lib/socket.js";

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://mern-chat-app-g7gc.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api", auth);
app.use("/api/messages", messages);
const port = process.env.PORT;
server.listen(port, () => {
  connectDB();
  console.log("connected to port " + port);
});

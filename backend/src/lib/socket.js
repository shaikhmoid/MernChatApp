import { Socket } from "dgram";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: ["https://mern-chat-app-nu-flame.vercel.app"] },
});

const userSocketOnline = {};
export const getReceiverSocketId = (receiverId) => {
  return userSocketOnline[receiverId];
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) userSocketOnline[userId] = socket.id;
  io.emit("getOnlineUser", Object.keys(userSocketOnline));
  console.log(userId);

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete userSocketOnline[userId];
    io.emit("getOnlineUser", Object.keys(userSocketOnline));
  });
});
export { app, io, server };

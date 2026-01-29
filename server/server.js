const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const rooms = require("./rooms");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const clientPath = path.join(__dirname, "..", "client");
app.use(express.static(clientPath));

io.on("connection", socket => {
  console.log("User connected:", socket.id);
  rooms.join(socket);

  socket.on("disconnect", () => rooms.leave(socket));
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});

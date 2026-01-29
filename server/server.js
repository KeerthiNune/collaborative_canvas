const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const rooms = require("./rooms");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("client"));

io.on("connection", socket => {
  console.log("User connected:", socket.id);

  rooms.join(socket);

  socket.on("disconnect", () => {
    rooms.leave(socket);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

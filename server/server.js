const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const rooms = require("./rooms");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const clientDir = path.resolve(__dirname, "../client");

// Serve static files
app.use(express.static(clientDir));

// Force index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDir, "index.html"));
});

io.on("connection", socket => {
  rooms.join(socket);
  socket.on("disconnect", () => rooms.leave(socket));
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});

const state = require("./state-manager");

function join(socket) {
  socket.emit("init", state.getAll());

  socket.on("drawing", data => {
    state.addStroke(data);
    socket.broadcast.emit("drawing", data);
  });

  socket.on("cursor", data => {
    socket.broadcast.emit("cursor", { id: socket.id, ...data });
  });

  socket.on("undo", () => {
    state.undo(socket.id);
    socket.broadcast.emit("refresh", state.getAll());
    socket.emit("refresh", state.getAll());
  });
}

function leave(socket) {
  socket.broadcast.emit("user_left", socket.id);
}

module.exports = { join, leave };

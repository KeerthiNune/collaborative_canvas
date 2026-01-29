let color = "black";

canvas.addEventListener("mousedown", e => {
  drawing = true;
  prev = getCoords(e);
});

canvas.addEventListener("mousemove", e => {
  const pos = getCoords(e);

  socket.emit("cursor", pos);

  if (!drawing) return;

  drawLine(prev, pos, color);

  socket.emit("drawing", {
    start: prev,
    end: pos,
    color,
    userId: socket.id
  });

  prev = pos;
});

canvas.addEventListener("mouseup", () => drawing = false);

document.getElementById("undo").onclick = () => {
  socket.emit("undo");
};

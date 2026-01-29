const socket = io();
const cursors = {};

socket.on("drawing", data => {
  drawLine(data.start, data.end, data.color);
});

socket.on("init", strokes => {
  redraw(strokes);
});

socket.on("refresh", strokes => {
  redraw(strokes);
});

socket.on("cursor", data => {
  cursors[data.id] = data;
});

socket.on("user_left", id => {
  delete cursors[id];
});

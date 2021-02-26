//Base canvas and dimensions
var canvas = document.body.appendChild(document.createElement("canvas"));
var width = canvas.height = canvas.width = 400;
var height = width;
var ctx = canvas.getContext("2d");
//Drawing variables
var lastPosition = null;
var drawing = false;
//Drawing functionality
function startDraw() {
  drawing = true;
}
canvas.onmousedown = startDraw;

function stopDraw() {
  drawing = false;
}
canvas.onmouseup = stopDraw;
canvas.onmouseleave = stopDraw;

function mouseMove(evt) {
  var pos = {
    x: evt.offsetX,
    y: evt.offsetY
  };
  if (lastPosition !== null && drawing === true) {
    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.closePath();
    ctx.stroke();
  }
  lastPosition = pos;
}
canvas.onmousemove = mouseMove;
//Resizer functions
var resizerX = document.body.appendChild(document.createElement("button"));
resizerX.innerHTML = "Resize X";
resizerX.onclick = function() {
  var newValue = null;
  while (isNaN(newValue) || newValue < 10) {
    newValue = parseInt(prompt("Insert new width", width.toString()));
  }
  var c = document.createElement("canvas");
  width = newValue;
  c.width = width;
  c.height = height;
  ctx = c.getContext("2d");
  ctx.drawImage(canvas, 0, 0);
  canvas.parentNode.replaceChild(c, canvas);
  canvas = c;
  canvas.onmousedown = startDraw;
  canvas.onmouseup = stopDraw;
  canvas.onmouseleave = stopDraw;
  canvas.onmousemove = mouseMove;
};
var resizerY = document.body.appendChild(document.createElement("button"));
resizerY.innerHTML = "Resize Y";
resizerY.onclick = function() {
  var newValue = null;
  while (isNaN(newValue) || newValue < 10) {
    newValue = parseInt(prompt("Insert new height", height.toString()));
  }
  var c = document.createElement("canvas");
  height = newValue;
  c.width = width;
  c.height = height;
  ctx = c.getContext("2d");
  ctx.drawImage(canvas, 0, 0);
  canvas.parentNode.replaceChild(c, canvas);
  canvas = c;
  canvas.onmousedown = startDraw;
  canvas.onmouseup = stopDraw;
  canvas.onmouseleave = stopDraw;
  canvas.onmousemove = mouseMove;
};c

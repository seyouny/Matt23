import './canvas.css';

function Canvas() {
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
  
  return (
    <div>

    </div>
  );
}

export default Canvas;


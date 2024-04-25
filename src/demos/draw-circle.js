export function drawCircle(app) {
  const canvas = new fabric.Canvas(app, {
    backgroundColor: "#fff",
  });

  let circle, isDown, origX, origY;

  canvas.on("mouse:down", function (o) {
    isDown = true;
    let pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    pointer = canvas.getPointer(o.e);
    circle = new fabric.Circle({
      left: origX,
      top: origY,
      originX: "center",
      originY: "center",
      radius: Math.sqrt(
        Math.pow(pointer.x - origX, 2) + Math.pow(pointer.y - origY, 2)
      ),
      stroke: "#000",
      strokeWidth: 2,
      fill: "rgba(255,0,0,0.5)",
    });
    canvas.add(circle);
  });

  canvas.on("mouse:move", function (o) {
    if (!isDown) return;
    let pointer = canvas.getPointer(o.e);

    circle.set({
      radius: Math.sqrt(
        Math.pow(pointer.x - origX, 2) + Math.pow(pointer.y - origY, 2)
      ),
    });

    canvas.renderAll();
  });

  canvas.on("mouse:up", function (o) {
    circle.setCoords();
    canvas.off("mouse:down").off("mouse:move").off("mouse:up");
    isDown = false;
  });
}

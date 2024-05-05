export function drawRectangle(app) {
  const canvas = new fabric.Canvas(app, {
    backgroundColor: "#fff",
  });

  let rect, isDown, origX, origY;

  canvas.on("mouse:down", function (o) {
    isDown = true;
    let pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    pointer = canvas.getPointer(o.e);
    rect = new fabric.Rect({
      left: origX,
      top: origY,
      originX: "left",
      originY: "top",
      width: pointer.x - origX,
      height: pointer.y - origY,
      angle: 0,
      fill: "rgba(255,0,0,0.5)",
      transparentCorners: false,
      // radius
      rx: 20,
      ry: 20,
    });
    canvas.add(rect);
  });

  canvas.on("mouse:move", function (o) {
    if (!isDown) return;
    let pointer = canvas.getPointer(o.e);

    if (origX > pointer.x) {
      rect.set({
        left: Math.abs(pointer.x),
      });
    }
    if (origY > pointer.y) {
      rect.set({
        top: Math.abs(pointer.y),
      });
    }

    rect.set({
      width: Math.abs(origX - pointer.x),
    });
    rect.set({
      height: Math.abs(origY - pointer.y),
    });

    canvas.renderAll();
  });

  canvas.on("mouse:up", function (o) {
    rect.setCoords();
    // désactive la fonction de dessin
    canvas.off("mouse:down").off("mouse:move").off("mouse:up");
    isDown = false;
  });
}

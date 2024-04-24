import { fabric } from "fabric";

const points = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 50,
    y: 0,
  },
  {
    x: 50,
    y: 50,
  },
  {
    x: 0,
    y: 50,
  },
];

export function loadPolygon(app) {
  const canvas = new fabric.Canvas(app, {
    backgroundColor: "#fff",
  });

  const poly = new fabric.Polygon(points, {
    left: 400,
    top: 300,
    fill: "red",
    strokeWidth: 0,
    stroke: "black",
    scaleX: 4,
    scaleY: 4,
    objectCaching: false,
    transparentCorners: false,
    cornerColor: "blue",
  });

  const lastControl = poly.points.length - 1;
  poly.cornerStyle = "circle";
  poly.cornerColor = "rgba(0,0,255,0.5)";
  poly.controls = poly.points.reduce(function (acc, point, index) {
    acc["p" + index] = new fabric.Control({
      positionHandler: polygonPositionHandler,
      actionHandler: anchorWrapper(
        index > 0 ? index - 1 : lastControl,
        actionHandler
      ),
      actionName: "modifyPolygon",
      pointIndex: index,
    });
    return acc;
  }, {});

  canvas.add(poly);
}

// define a function that can locate the controls.
// this function will be used both for drawing and for interaction.
function polygonPositionHandler(dim, finalMatrix, fabricObject) {
  const x = fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x;
  const y = fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y;

  return fabric.util.transformPoint(
    { x, y },
    fabric.util.multiplyTransformMatrices(
      fabricObject.canvas.viewportTransform,
      fabricObject.calcTransformMatrix()
    )
  );
}

function getObjectSizeWithStroke(object) {
  const stroke = new fabric.Point(
    object.strokeUniform ? 1 / object.scaleX : 1,
    object.strokeUniform ? 1 / object.scaleY : 1
  ).multiply(object.strokeWidth);

  return new fabric.Point(object.width + stroke.x, object.height + stroke.y);
}

// define a function that will define what the control does
// this function will be called on every mouse move after a control has been
// clicked and is being dragged.
// The function receive as argument the mouse event, the current trasnform object
// and the current position in canvas coordinate
// transform.target is a reference to the current object being transformed,
function actionHandler(eventData, transform, x, y) {
  let polygon = transform.target,
    currentControl = polygon.controls[polygon.__corner],
    mouseLocalPosition = polygon.toLocalPoint(
      new fabric.Point(x, y),
      "center",
      "center"
    ),
    polygonBaseSize = getObjectSizeWithStroke(polygon),
    size = polygon._getTransformedDimensions(0, 0),
    finalPointPosition = {
      x:
        (mouseLocalPosition.x * polygonBaseSize.x) / size.x +
        polygon.pathOffset.x,
      y:
        (mouseLocalPosition.y * polygonBaseSize.y) / size.y +
        polygon.pathOffset.y,
    };
  polygon.points[currentControl.pointIndex] = finalPointPosition;
  return true;
}

// define a function that can keep the polygon in the same position when we change its
// width/height/top/left.
function anchorWrapper(anchorIndex, fn) {
  return function (eventData, transform, x, y) {
    let fabricObject = transform.target,
      absolutePoint = fabric.util.transformPoint(
        {
          x: fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x,
          y: fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y,
        },
        fabricObject.calcTransformMatrix()
      ),
      actionPerformed = fn(eventData, transform, x, y),
      newDim = fabricObject._setPositionDimensions({}),
      polygonBaseSize = getObjectSizeWithStroke(fabricObject),
      newX =
        (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) /
        polygonBaseSize.x,
      newY =
        (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) /
        polygonBaseSize.y;
    fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
    return actionPerformed;
  };
}

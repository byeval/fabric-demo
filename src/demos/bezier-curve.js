import { fabric } from "fabric";

export function bezierCurve(app) {
  const canvas = new fabric.Canvas(app, {
    backgroundColor: "#fff",
  });
  const path = new fabric.Path("M 50,150 C 150,50 300,250 350,100", {
    strokeWidth: 6,
    stroke: "red",
    left: 400,
    top: 300,
    fill: false,
  });

  console.log(path);

  canvas.add(path);
}

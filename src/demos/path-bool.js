import { Path, Group, paper } from "paper";
import { fabric } from "fabric";

export function pathBool(app) {
  const canvas = new fabric.Canvas(app, {
    backgroundColor: "#fff",
  });

  const circlePath = `M 100, 100
  m 75, 0
  a 75,75 0 1,0 -150,0
  a 75,75 0 1,0  150,0z`;

  const squarePath = `M 0 0 H 200 V 200 H 0 L 0 0`;

  const square = new fabric.Path(squarePath, {
    strokeWidth: 1,
    stroke: "red",
    left: 400,
    top: 300,
    fill: "",
  });
  canvas.add(square);

  const circle = new fabric.Path(circlePath, {
    strokeWidth: 1,
    stroke: "black",
    left: 400,
    top: 300,
    fill: false,
  });
  canvas.add(circle);

  const ghost = document.createElement("canvas");
  paper.setup(ghost);
  const inner = new Path(circlePath);
  const outer = new Path(squarePath);
  // intersect subtract
  const rest = outer.intersect(inner);

  const result = new fabric.Path(rest.pathData);
  canvas.add(result);
}

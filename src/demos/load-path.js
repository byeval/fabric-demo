import { fabric } from "fabric";

export function loadPath(app) {
  const canvas = new fabric.Canvas(app, {
    backgroundColor: "#fff",
  });

  const path = new fabric.Path(
    `
  M 12 19
  Q 12 15 16 15
  Q 42 15 68 15
  q 4 0 4 4
  L 72 51
  q 0 4 -4 4
  Q 42 55 16 55
  q -4 0 -4 -4
  z
`,
    {
      strokeWidth: 1,
      stroke: "red",
      left: 400,
      top: 300,
      fill: false,
    }
  );

  canvas.add(path);
}

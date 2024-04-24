import { fabric } from "fabric";

export function GradientText(app) {
  const canvas = new fabric.Canvas(app, {
    backgroundColor: "#fff",
  });

  const text1 = new fabric.Text("这是一个线性渐变文本", {
    top: 200,
    left: 400,
  });

  const linearGrad = new fabric.Gradient({
    type: "linear",
    gradientUnits: "pixels",
    coords: {
      x1: 0,
      y1: 0,
      x2: text1.width,
      y2: text1.height,
    },
    colorStops: [
      { offset: 0, color: "pink" }, // first color stop
      { offset: 0.5, color: "violet" }, // second color stop
      { offset: 1, color: "skyBlue" }, // third color stop
    ],
  });
  text1.set("fill", linearGrad);
  canvas.add(text1);

  const text2 = new fabric.Text("这是一个径向渐变文本", {
    top: 300,
    left: 400,
  });
  const radialGrad = new fabric.Gradient({
    type: "radial",
    coords: {
      x1: text2.width / 2,
      y1: text2.height / 2,
      x2: text2.width / 2,
      y2: text2.height / 2,
      r1: text2.width / 6, // inner circle radius
      r2: text2.width / 2, // outer circle radius
    },
    colorStops: [
      { offset: 0, color: "pink" }, // first color stop
      { offset: 0.5, color: "violet" }, // second color stop
      { offset: 1, color: "skyBlue" }, // third color stop
    ],
  });
  text2.set("fill", radialGrad);
  canvas.add(text2);
}

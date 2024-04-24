import { fabric } from "fabric";
import { adjustFontSize } from "./utils";

fabric.Object.prototype.originX = fabric.Object.prototype.originY = "center";
fabric.Object.prototype.objectCaching = true;

export function freeDrawPathText(app) {
  const canvas = new fabric.Canvas(app, {
    backgroundColor: "#fff",
    isDrawingMode: true,
    freeDrawingBrush: new fabric.PencilBrush({ decimate: 8 }),
  });

  canvas.on("before:path:created", function (opt) {
    const { path } = opt;
    // 可以隐藏 path
    // path.strokeWidth = 0;
    const pathInfo = fabric.util.getPathSegmentsInfo(path.path);
    path.segmentsInfo = pathInfo;
    // 拿到路径长度，最后一个路径的结构是 {length: 648.678915259924, x: 618.001, y: 235.0869375}
    const pathLength = pathInfo[pathInfo.length - 1].length;
    const content = "测试文字，包含 English，会根据路径长度自动缩小字号";
    const fontSize = adjustFontSize(content, pathLength);
    const text = new fabric.Text(content, {
      fontSize: fontSize,
      path: path,
      // 下面三个属性的支持不太好，因为是字符级别的，字符之间连接不平滑
      // underline: true,
      // linethrough: true,
      // overline: true,
      top: path.top,
      left: path.left,
    });
    canvas.add(text);
  });

  canvas.on("path:created", function (opt) {
    canvas.remove(opt.path);
  });
}

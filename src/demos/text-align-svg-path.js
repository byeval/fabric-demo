import { fabric } from "fabric";
import { adjustFontSize } from "./utils";

export function TextAlignSvgPath(app) {
  const canvas = new fabric.Canvas(app, {
    backgroundColor: "#fff",
  });

  fabric.loadSVGFromURL(
    "https://next-ubanner.oss-cn-beijing.aliyuncs.com/AE_BODY_MOVIN/TMP/4e4825a610bd759a7adbed5d89cb5b58/scribble.svg",
    (objects, options) => {
      const svg = fabric.util.groupSVGElements(objects);
      svg.set({ top: 200, left: 300 });
      canvas.add(svg);
      const path = new fabric.Path(objects[1].d);
      path.strokeWidth = 0;
      path.fill = "rgba(0,0,0,.05)";
      //   path.scaleToWidth(600);
      //   path.setCoords();
      const matrix = path.calcTransformMatrix();
      //   console.log(fabric.util.transformPoint(P, path.calcTransformMatrix()));
      console.log(path, matrix, objects);
      console.log(fabric.util);
      const pathInfo = fabric.util
        .getPathSegmentsInfo(path.path)
        .map((item) => fabric.util.transformPoint(item, matrix));
      console.log(pathInfo, matrix);
      path.segmentsInfo = pathInfo;
      const pathLength = pathInfo[pathInfo.length - 1].length;
      const content = "测试文字，包含 English，会根据路径长度自动缩小字号";
      const fontSize = adjustFontSize(content, pathLength);
      const text = new fabric.Text(content, {
        fontSize: fontSize,
        path: path,
        top: 300,
        left: 400,
      });

      canvas.add(text);
    }
  );
}

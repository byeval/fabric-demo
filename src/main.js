import "./style.css";
import "./demos/preset";
import { freeDrawPathText } from "./demos/free-draw-path-text";
import { TextAlignSvgPath } from "./demos/text-align-svg-path";
import { GradientText } from "./demos/gradient-text";
import { loadPolygon } from "./demos/load-polygon";

const demos = [
  "Free draw path text",
  "Text align svg path",
  "Gradient text",
  "Load polygon",
];

document.querySelector("#app").innerHTML = `${demos
  .map((text, index) => {
    return `<div class="demo"><h1 class="title">${text}</h1><canvas id="demo-${index}" width="800" height="600"></canvas></div>`;
  })
  .join("")}`;

function setup() {
  [freeDrawPathText, TextAlignSvgPath, GradientText, loadPolygon].map(
    (fn, index) => {
      fn(document.querySelector(`#demo-${index}`));
    }
  );
}

setup();

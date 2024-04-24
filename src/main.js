import "./style.css";
import { freeDrawPathText } from "./demos/free-draw-path-text";
import { TextAlignSvgPath } from "./demos/text-align-svg-path";
import { GradientText } from "./demos/gradient-text";

const demos = ["Free draw path text", "Text align svg path", "Gradient text"];

document.querySelector("#app").innerHTML = `${demos
  .map((text, index) => {
    return `<div class="demo"><h1 class="title">${text}</h1><canvas id="demo-${index}" width="800" height="600"></canvas></div>`;
  })
  .join("")}`;

function setup() {
  [freeDrawPathText, TextAlignSvgPath, GradientText].map((fn, index) => {
    fn(document.querySelector(`#demo-${index}`));
  });
}

setup();

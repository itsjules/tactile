let sketch = new p5();
let width = windowWidth;
let height = windowHeight;

//canvas doesnt like us, pls help!!! we need him responsive
function setup() {
  sketch.createCanvas(windowWidth,windowHeight);
  sketch.frameRate(60);
}
window.setup = setup;

// function windowResized() {
//   sketch.resizeCanvas(windowWidth, windowHeight);
// }
// window.addEventListener("resize", windowResized);



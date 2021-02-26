angleMode(DEGREES);
let scale = 1.2;
let scaleSmoothnes=0.2;

let longcane;

function preload() {
  longcane = loadImage("assets/blindenstock_P.png");
}
window.preload = preload;

function longCaneHover() {
  push();
  // imageMode(CENTER);
  let cane = {
    xDown: -(longcane.width / 2) * scale,
    yDown: -longcane.height * scale,
    xUp: 0,
    yUp: 0,
  };
  translate(window.width / 2, window.height);
  push();
  if (mouseX < window.width / 2 - longcane.height * scale) {
      rotate(-90);
    }
  if (
    mouseX > window.width / 2 - longcane.height * scale &&
    mouseX < window.width / 2
  ) {
    let fullDistance = longcane.height * scale;
    let mouseDistance = mouseX - (window.width / 2 - longcane.height * scale);
    let distancePercentage = 1 - mouseDistance / fullDistance;
    rotate(-90 * distancePercentage);
    scale=1+scaleSmoothnes*(distancePercentage);
    // console.log(distancePercentage);
  }
  if (
    mouseX < window.width / 2 + longcane.height * scale &&
    mouseX > window.width / 2
  ) {
    let fullDistance = longcane.height * scale;
    let mouseDistance = mouseX - (window.width / 2);
    let distancePercentage = mouseDistance / fullDistance;
    rotate(90 * distancePercentage);
    scale=1+scaleSmoothnes*(distancePercentage);
    // console.log(distancePercentage);
  }
  if (mouseX > window.width / 2 + longcane.height * scale) {
      rotate(90);
}
  // rotate(mouseX/2);

  image(
    longcane,
    cane.xDown,
    cane.yDown,
    longcane.width * scale,
    longcane.height * scale
  );
  pop();
  fill("red");
  ellipse(0, 0, 10);
  fill("blue");
  ellipse(-longcane.height * scale, 0, 10);
  ellipse(+longcane.height * scale, 0, 10);
  pop();
}

function hitDetection(){
    if(mouseX>window.width/2-window.width*0.05 && mouseX<window.width/2+window.width*0.05){
        console.log("wupwup");
        rectMode(CENTER);
        rect(window.width/2,longcane.height,window.width*0.1)
    }
}

function draw() {
  background("grey");
  hitDetection();
  longCaneHover();
  
  // console.log(longcane);
  // console.log({mouseX,mouseY});
}
window.draw = draw;

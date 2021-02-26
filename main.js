angleMode(DEGREES);
let scale = 1.2;
let scaleSmoothnes=0.3;
let hitArea={};
let fade=0;
let hitCounter=0;
let longcane;
let executed=false;

function preload() {
  longcane = loadImage("assets/blindenstock_P.png");
}
window.preload = preload;

function update(){
  hitArea={left:window.width/2-window.width*0.05, right: window.width/2+window.width*0.05}
}


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
    if (mouseX>hitArea.left && mouseX<hitArea.right){
        (fade>=255)? fade=255 : fade+=20;
        if(!executed){
        hitCount(); 
        executed=true;
        }
    } else{
        (fade<=0)? fade=0 : fade-=10; 
        executed=false;
    }
    rectMode(CENTER);
    noStroke();
    fill(86,194,232,fade);
    rect(window.width/2,longcane.height,longcane.height*0.3)
}

function hitCount(){
   hitCounter+=1;
   return;
}



function draw() {
  background("grey");
  update();
  hitDetection();
  longCaneHover();
  console.log(hitCounter);
  
  // console.log(longcane);
  // console.log({mouseX,mouseY});
}
window.draw = draw;

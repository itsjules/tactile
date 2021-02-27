angleMode(DEGREES);
let scale = 1.2;
let scaleSmoothnes=0.3;
let hitArea={};
let fade=0;
let hitCounter=0;
let executed=false;
let index=0;
let animationPlay=false;
let longcane;
let leitlinienAnimation=[];
let footstep;

var start=false;

function preload() {
  longcane = loadImage("assets/img/blindenstock_P.png");
  for (let i=0; i<12;i++){
   let FrameNumber="Frame"+nf(i,2);
   let leitlinie={};
   leitlinie[FrameNumber]=loadImage("assets/img/leitlinien_animation/Leitlinien png animation_000"+nf(i,2)+".png");
   leitlinienAnimation.push(leitlinie[FrameNumber]);
  }
  start=true;
  // footstep= loadSound("assets/sound/footstep.mp3");
  
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
    yDown: -longcane.height * scale
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
        // (fade>=255)? fade=255 : fade+=50;
        if(!executed){
        hitCount();
        executed=true;
        }
        animationPlay=true;
    } else{
        // (fade<=0)? fade=0 : fade-=50; 
        executed=false;
        
    }
    leitAnimation(); 
}

function leitAnimation(){
  if(animationPlay){
  push();
  imageMode(CENTER);
  
  let animationSpeed=0.21;
  // (index>11.9)?index=0 : index;
  index += animationSpeed;
  let animation = floor(index);
  // scale(-1,1);
  image(leitlinienAnimation[animation],window.width/2,longcane.height,leitlinienAnimation[animation].width*0.4,leitlinienAnimation[animation].height*0.4);
  
  pop();
  }
  if(index>11){
    index=0;
    animationPlay=false;
  }
}

function hitCount(){
   hitCounter+=1;
  //  footstep.play();
   return;
}



function draw() {
  if(start){
  background("grey");
  update();
  hitDetection();
  longCaneHover();
  // console.log(hitCounter);
  console.log(index, animationPlay);
  // console.log(longcane);
  // console.log({mouseX,mouseY});
  }
}
window.draw = draw;

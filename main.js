angleMode(DEGREES);
let scales=0;
let scaleMax=0.2;
let hitArea={};
let hitCounter=0;
let steps=40;

let screenFreeze=false;
let fade=255;
let fadeSteps=3;

let executed=false;
let index=0;
let animationPlay=false;
let mirrorImg;
let mirrorPlay=false;

let longcane;
let leitlinienAnimation=[];
let footstep;

var start=false;

let myVar;

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

let longcaneHeight;
let longcaneWidth;
let animationScale=1;

function update(){
  hitArea={left:window.width/2-window.width*0.05, right: window.width/2+window.width*0.05};
  if(window.width/2-longcaneHeight<0 && window.width/2+longcaneHeight>window.width){
    scales=0;
  }
  longcaneHeight=window.height*(0.5+scales);
  longcaneWidth=(longcane.width/longcane.height)*longcaneHeight;
}


function longCaneHover() {
  push();
  let cane = {
    xDown: -(longcaneWidth / 2) ,
    yDown: -longcaneHeight 
  };
  translate(window.width / 2, window.height);
  push();
  if(!screenFreeze){
  if (mouseX < window.width / 2 - longcaneHeight) {
      rotate(-90);
    }
  if (
    mouseX > window.width / 2 - longcaneHeight &&
    mouseX < window.width / 2
  ) {
    let fullDistance = longcaneHeight;
    let mouseDistance = mouseX - (window.width / 2 - longcaneHeight);
    let distancePercentage = 1 - mouseDistance / fullDistance;
    rotate(-90 * distancePercentage);
    if(window.width/2-longcaneHeight>0){
    // console.log("jupjup");  
    scales=scaleMax*(distancePercentage);
    }
  }
  if (
    mouseX < window.width / 2 + longcaneHeight &&
    mouseX > window.width / 2
  ) {
    let fullDistance = longcaneHeight;
    let mouseDistance = mouseX - (window.width / 2);
    let distancePercentage = mouseDistance / fullDistance;
    rotate(90 * distancePercentage);
    if(window.width/2+longcaneHeight<window.width){
      // console.log("jupjup");  
      scales=scaleMax*(distancePercentage);
      }
  }
  if (mouseX > window.width / 2 + longcaneHeight) {
      rotate(90);
  }
}
 if(screenFreeze){
   (fade<=0)? fade=0:fade-=fadeSteps;
  //  console.log(fade);
   tint(255,fade);
 }
  image(
    longcane,
    cane.xDown,
    cane.yDown,
    longcaneWidth,
    longcaneHeight
  );
  pop();
  fill("red");
  ellipse(0, 0, 10);
  fill("blue");
  ellipse(-longcaneHeight, 0, 10);
  ellipse(+longcaneHeight, 0, 10);
  pop();
}


function hitDetection(){
    if (mouseX>hitArea.left && mouseX<hitArea.right){
        (mouseX>window.width/2 && mouseX<=window.width && !animationPlay)? mirrorPlay=true : mirrorPlay;
        if(!executed){
        hitCount();
        executed=true;
        }
        animationPlay=true;
    } else{
        // (fade<=0)? fade=0 : fade-=50; 
        executed=false;
        
    }
    // leitAnimation(); 
}

function leitAnimation(){
  (mirrorPlay)?mirrorImg=-1:mirrorImg=1;
  if(animationPlay){
  push();
  imageMode(CENTER);
  rectMode(CENTER);
  
  let animationSpeed=0.21;
  index += animationSpeed;
  let animation = floor(index);
  
  if(hitCounter<steps){ 
    
    scale((mirrorImg)*1,1);
    image(
      leitlinienAnimation[animation],
      (mirrorImg)*window.width / 2,
      window.height / 2,
      (leitlinienAnimation[animation].width /
        leitlinienAnimation[animation].height) *
        (window.height * animationScale),
      window.height * animationScale
    );
 
  }
  
  else if(hitCounter>=steps){
  if(hitCounter===steps+1){
    screenFreeze=true;
  }
  noStroke();
  fill(255,221,44);
  rect(window.width/2,window.height/2,window.width*0.1);
  }
  pop();
  }
  if(index>11){
    index=0;
    animationPlay=false;
    mirrorPlay=false;
  }
}

function hitCount(){
   hitCounter+=1;
  //  footstep.play();
   return;
}

function freeze(){
  push();
  noStroke();
  rectMode(CENTER);
  fill(255,221,44,fade);
  rect(window.width/2,window.height/2+(255-fade),window.width*(0.1+(255-fade)/200));
  pop();
  if(fade<=0){
    setTimeout(redy2Go,1000);
  }
}

function redy2Go(){
  push();
  rectMode(CENTER);
  fill("white");
  textSize(40);
  text("Whuuu, dieser Moment muss iwie an HTML/CSS weitergegeben werden",window.width/2, window.height/2,window.width*3/5,window.height/2);
  // console.log("wuhu");
  pop();
  // clearTimeout(myVar);
}

function draw() {
  if(start){
  background("grey");
  update();
  if(screenFreeze){
  freeze();
  } else {
  hitDetection();
  leitAnimation();
  }
  longCaneHover();
  
  console.log(mirrorPlay,mirrorImg);
  // console.log(index, animationPlay);
  // console.log(window.height);
  // console.log({mouseX,mouseY});
  }
}
window.draw = draw;

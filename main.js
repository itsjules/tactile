angleMode(DEGREES);
let scales = 0;
let scaleMax = 0.2;
let hitArea = {};
let hitCounter = 0;
let counter = 0;
let steps = 40;

let screenFreeze = false;
let fade = 0;
let fadeSteps = 3;

let executed = false;
let index = 0;
let animationPlay = false;
let mirrorImg;
let mirrorPlay = false;

let longcane;
let longcane2;
let leitlinienAnimation = [];
let aufmerksamkeitAnimation = [];
let aufmerksamkeitsFeld;
let footstep;
let video = document.getElementById("transformationVideo");
video.style.display = "none";
let audio = document.getElementById("transformationAudio");
// let p5Canvas=select("");

var start = false;
var storyPart;
let executeRestart = false;

function preload() {
  longcane = loadImage("assets/img/longcane.png");
  longcane2 = loadImage("assets/img/longcane2.png");
  for (let i = 0; i < 12; i++) {
    let FrameNumber = "Frame" + nf(i, 2);
    let leitlinie = {};
    leitlinie[FrameNumber] = loadImage(
      "assets/img/leitlinien_animation/Leitlinien png animation_000" +
        nf(i, 2) +
        ".png"
    );
    leitlinienAnimation.push(leitlinie[FrameNumber]);
  }
  for (let i = 0; i < 11; i++) {
    let FrameNumber = "Frame" + nf(i, 2);
    let aufmerksamkeit = {};
    aufmerksamkeit[FrameNumber] = loadImage(
      "assets/img/aufmerksamkeit_animation/Leitlinien png animation_000" +
        nf(i, 2) +
        ".png"
    );
    aufmerksamkeitAnimation.push(aufmerksamkeit[FrameNumber]);
  }
  aufmerksamkeitsFeld = loadImage("assets/img/aufmerksamkeitsfeld ohne rand.png");
  // footstep = loadSound("assets/sound/Footstep.mp3");
  // start = true;
}
window.preload = preload;

let longcaneHeight;
let longcaneWidth;
let animationScaleLeit = 1;
let animationScaleFeld = 0.8;
let scaleFeld=0.2;

function getStoryPart(part) {
  switch (part) {
    case "beforeProblem":
      storyPart = 0;
      steps = 7;
      reset();
      break;
    case "afterProblem":
      storyPart = 1;
      steps = 4;
      reset();
      break;
    case "afterTransformation":
      storyPart = 2;
      steps = 7;
      longcane = longcane2;
      reset();
      break;
    case "afterLösung":
      storyPart = 3;
      steps = 6;
      longcane = longcane2;
      reset();
      break;
  }
  return storyPart;
}

function update() {
  hitArea = {
    left: window.width / 2 - window.width * 0.05,
    right: window.width / 2 + window.width * 0.05,
  };
  if (
    window.width / 2 - longcaneHeight < 0 &&
    window.width / 2 + longcaneHeight > window.width
  ) {
    scales = 0;
  }
  longcaneHeight = window.height * (0.5 + scales);
  longcaneWidth = (longcane.width / longcane.height) * longcaneHeight;
  getStoryPart(document.body.className); // 1+i      hier document.get blabala class aus html-body beziehen
}

function longCaneHover() {
  push();
  let cane = {
    xDown: -(longcaneWidth / 2),
    yDown: -longcaneHeight,
  };
  translate(window.width / 2, window.height);
  push();
  if (!screenFreeze) {
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
      if (window.width / 2 - longcaneHeight > 0) {
        scales = scaleMax * distancePercentage;
      }
    }
    if (
      mouseX < window.width / 2 + longcaneHeight &&
      mouseX > window.width / 2
    ) {
      let fullDistance = longcaneHeight;
      let mouseDistance = mouseX - window.width / 2;
      let distancePercentage = mouseDistance / fullDistance;
      rotate(90 * distancePercentage);
      if (window.width / 2 + longcaneHeight < window.width) {
        scales = scaleMax * distancePercentage;
      }
    }
    if (mouseX > window.width / 2 + longcaneHeight) {
      rotate(90);
    }
  }
  if (screenFreeze) {
    fade <= 0 ? (fade = 0) : (fade -= fadeSteps);
    tint(255, fade);
  } else {
    fade >= 255 ? (fade = 255) : (fade += fadeSteps - 1);
    tint(255, fade);
  }
  image(longcane, cane.xDown, cane.yDown, longcaneWidth, longcaneHeight);
  pop();
  fill("red");
  ellipse(0, 0, 10);
  fill("blue");
  ellipse(-longcaneHeight, 0, 10);
  ellipse(+longcaneHeight, 0, 10);
  pop();
}

function hitDetection() {
  if (mouseX > hitArea.left && mouseX < hitArea.right) {
    mouseX > window.width / 2 && mouseX <= window.width && !animationPlay
      ? (mirrorPlay = true)
      : mirrorPlay;
    if (!executed) {
      hitCount();
      executed = true;
    }
    animationPlay = true;
  } else {
    executed = false;
    
  }
}

function leitAnimation() {
  mirrorPlay ? (mirrorImg = -1) : (mirrorImg = 1);
  if (animationPlay) {
    push();
    imageMode(CENTER);
    rectMode(CENTER);

    let animationSpeed = 0.21;
    index += animationSpeed;
    let animation = floor(index);

    if (hitCounter < steps) {
      scale(mirrorImg * 1, 1);
      image(
        leitlinienAnimation[animation],
        (mirrorImg * window.width) / 2,
        window.height / 2,
        (leitlinienAnimation[animation].width /
          leitlinienAnimation[animation].height) *
          (window.height * animationScaleLeit),
        window.height * animationScaleLeit
      );
      if (index > 11) {
        index = 0;
        animationPlay = false;
        mirrorPlay = false;
      }
    } else if (hitCounter >= steps) {
      scale(mirrorImg * 1, 1);
      image(
        aufmerksamkeitAnimation[animation],
        (mirrorImg * window.width) / 2,
        window.height / 2,
        (aufmerksamkeitAnimation[animation].width /
          aufmerksamkeitAnimation[animation].height) *
          (window.height * animationScaleFeld),
        window.height * animationScaleFeld
      );
      if (index > 10) {
        index = 0;
        animationPlay = false;
        mirrorPlay = false;
      }
    }
    pop();
  }
}

function hitCount() {
  hitCounter += 1;
  // footstep.play();
  return;
}

function endSteps() {
  if (hitCounter === steps + 2) {
    screenFreeze = true;
  }
}

function freeze() {
  if (storyPart > 1) {
    push();
    imageMode(CENTER);
    // scale(255-fade,1);
    tint(255, fade);
    (fade<=0)?scaleFeld=0.2:scaleFeld+=0.02;
    image(
      aufmerksamkeitsFeld,
      window.width / 2,
      window.height / 2,
      (aufmerksamkeitsFeld.width / aufmerksamkeitsFeld.height) *
        (window.height * scaleFeld),
      window.height * scaleFeld
    );
    // noStroke();
    // rectMode(CENTER);
    // fill(255, 221, 44, fade);
    // rect(
    //   window.width / 2,
    //   window.height / 2 + (255 - fade),
    //   window.width * (0.1 + (255 - fade) / 200)
    // );
    pop();
  }
  if (fade <= 0) {
    if (document.body.className === "afterProblem") {
      document.getElementById("showRoom").className = "transformation";
      // document.getElementsByClassName("p5Canvas").display="none";
      video.style.display = "block";
      video.playbackRate = 0.9;
      video.play();
      audio.play();
      noLoop();
    } else if (document.body.className === "beforeProblem") {
      document.getElementById("showRoom").className = "problem";
    } else if (document.body.className === "afterTransformation") {
      document.getElementById("showRoom").className = "lösung";
    } else if (document.body.className === "afterLösung") {
      document.getElementById("showRoom").className = "technik";
    }

    executeRestart = true;
  
  }
}

function reset() {
  if (executeRestart) {
    hitCounter = 0;
    counter = 0;
    console.log("lalala");
    executeRestart = false;
    screenFreeze = false;
  }
}

function startCanvas() {
  if (
    document.body.className === "beforeProblem" ||
    document.body.className === "afterProblem" ||
    document.body.className === "afterTransformation" ||
    document.body.className === "afterLösung"
  ) {
    start = true;
    // loop();
  } else {
    start = false;
    clear();
    // noLoop();

  }
}

// function mouseClicked(){
//    if(screenFreeze && fade<=0){
//      loop();
//    }
// }
// window.mouseClicked=mouseClicked;

function draw() {
  startCanvas();
  console.log(document.body.className);
  // console.log(start);

  if (start) {
    background("grey");
    counter += 1;
    update();
    if (screenFreeze) {
      freeze();
    } else if (counter > 140) {
      hitDetection();
      if (storyPart > 1) {
        leitAnimation();
      }
    }
    endSteps();
    longCaneHover();
    // console.log(mirrorPlay,mirrorImg);
    // console.log(index, animationPlay);
    // console.log(hitCounter, executeRestart, storyPart);
    // console.log(executeRestart);
    // console.log(millis());
    // console.log({storyPart});

  
  }
}
window.draw = draw;

video.addEventListener("ended", (event) => {
  document.getElementById("showRoom").className = "afterTransformation";
  video.style.display = "none";

  loop();
});

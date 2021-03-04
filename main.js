angleMode(DEGREES);
let scales = 0;
let scaleMax = 0.2;
let hitArea = {};
let hitCounter = 0;
let counter = 0;
let steps = 40;

let screenFreeze = false;
let fade = 255;
let fadeSteps = 3;

let executed = false;
let indexLeit = 0;
let indexAufm=0;
let animationPlay = false;
let mirrorImg;
let mirrorPlay = false;

let longcane;
let longcane2;
let leitlinienAnimation = [];
let aufmerksamkeitAnimation = [];
let aufmerksamkeitsFeld;
let kartePin;
let footstep;
let video = document.getElementById("transformationVideo");
video.style.display = "none";
let audio = document.getElementById("transformationAudio");

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
  aufmerksamkeitsFeld = loadImage(
    "assets/img/aufmerksamkeitsfeld ohne rand.png"
  );
  kartePin=loadImage("assets/img/weißer Pin Schatten.png");
  footstep = loadSound("assets/sound/footstep.mp3");
}
window.preload = preload;

let longcaneHeight;
let longcaneWidth;
let animationScaleLeit = 1;
let animationScaleFeld = 0.8;
let scaleFeld = 0.2;

function getStoryPart(part) {
  switch (part) {
    case "beforeProblem":
      storyPart = 0;
      steps = 7;
      longcane = longcane;
      reset();
      break;
    case "afterProblem":
      storyPart = 1;
      steps = 4;
      longcane = longcane;
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
    case "afterTechnik":
      storyPart = 4;
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
  line(window.width / 2 - window.width * 0.05,0,window.width / 2 - window.width * 0.05,window.height);
  line(window.width / 2 + window.width * 0.05,0,window.width / 2 + window.width * 0.05,window.height);
  if (
    window.width / 2 - window.height * (0.5 + scaleMax) < 0 &&
    window.width / 2 + window.height * (0.5 + scaleMax) > window.width
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
  
  if (screenFreeze) {
    fade >= 255 ? (fade = 255) : (fade += fadeSteps);
  } else {
    fade <= 0 ? (fade = 0) : (fade -= fadeSteps);
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
    (mouseX > window.width / 2 && mouseX <= window.width && !animationPlay)
      ? (mirrorPlay = true)
      : null;
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

    if (hitCounter < steps) {
    let animationSpeed = 0.21;
    indexLeit += animationSpeed;
    let animation = floor(indexLeit);

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
      if (indexLeit > 11) {
        indexLeit = 0;
        animationPlay = false;
        mirrorPlay = false;
      }
    } else if (hitCounter >= steps) {
      let animationSpeed = 0.21;
      indexAufm += animationSpeed;
      let animation = floor(indexAufm);

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
      if (indexAufm > 10) {
        indexAufm = 0;
        animationPlay = false;
        mirrorPlay = false;
      }
    }
    pop();
  }
}

function hitCount() {
  hitCounter += 1;
  footstep.play();
  return;
}

function endSteps() {
  if (hitCounter === steps + 2) {
    screenFreeze = true;
  }
}

function freeze() {
  animationPlay=false;
  indexLeit=0;
  indexAufm=0;
  if (storyPart > 1) {
    push();
    imageMode(CENTER);
    fade >= 255 ? (scaleFeld = 0.2) : (scaleFeld += 0.02);
    if(storyPart===4){
    image(
        kartePin,
        window.width / 2,
        window.height / 2,
        (kartePin.width / kartePin.height) *
          (window.height * scaleFeld),
        window.height * scaleFeld
      );
    } else {
       image(
      aufmerksamkeitsFeld,
      window.width / 2,
      window.height / 2,
      (aufmerksamkeitsFeld.width / aufmerksamkeitsFeld.height) *
        (window.height * (scaleFeld)),
      window.height * (scaleFeld)
    );
    }
    pop();
  }
  if (fade >= 255) {
    if (document.body.className === "afterProblem") {
      document.getElementById("showRoom").className = "transformation";
      video.style.display = "block";
      video.playbackRate = 0.9;
      video.play();
      audio.volume = 0.1;
      audio.play();
    } else if (document.body.className === "beforeProblem") {
      document.getElementById("showRoom").className = "problem";
    } else if (document.body.className === "afterTransformation") {
      document.getElementById("showRoom").className = "lösung";
    } else if (document.body.className === "afterLösung") {
      document.getElementById("showRoom").className = "technik";
    } else if (document.body.className === "afterTechnik") {
      document.getElementById("showRoom").className = "skalierbarkeit";
    }
    executeRestart = true;
  }
}

video.addEventListener("ended", (event) => {
  document.getElementById("showRoom").className = "afterTransformation";
  video.style.display = "none";
});

function reset() {
  if (executeRestart) {
    hitCounter = 0;
    counter = 0;
    executeRestart = false;
    screenFreeze = false;
  }
}

function startCanvas() {
  if (
    document.body.className === "beforeProblem" ||
    document.body.className === "afterProblem" ||
    document.body.className === "afterTransformation" ||
    document.body.className === "afterLösung" ||
    document.body.className==="afterTechnik"
  ) {
    start = true;
  } else {
    start = false;
    clear();
    return;
  }
}

function draw() {
  startCanvas();
  

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
    push();
    fill(color(128,fade));
    rect(0,0,window.width,window.height);
    pop();
  }
}
window.draw = draw;

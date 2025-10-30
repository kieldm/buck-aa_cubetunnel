var bkgdColor, foreColor;

var coreTunnel;
var coreCubes = [];

var accent = [];
var highlight = [];
var shadow = [];

var coreImage;
var coreImageBlurred0;
var coreImageBlurred1;
var coreImageBlurredCombo;

var softBlackPG;
var outerPG;

var bleed = 0.5;

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);

  bkgdColor = color("#e1e1e1");
  foreColor = color("#FFFFFF");
  
  accent[accent.length] = color("#e6b8f9");
  highlight[highlight.length] = color("#f6a157");
  shadow[shadow.length] = color("#e2dedd");

  accent[accent.length] = color("#3d5af4");
  highlight[highlight.length] = color("#3d5af4");
  shadow[shadow.length] = color("#cc88f6");

  accent[accent.length] = color("#f75f72");
  highlight[highlight.length] = color("#cc88f6");
  shadow[shadow.length] = color("#3e5bf5");
  
  accent[accent.length] = color("#eafa8f");
  highlight[highlight.length] = color("#cc88f6");
  shadow[shadow.length] = color("#756df0");

  accent[accent.length] = color("#68f7b8");
  highlight[highlight.length] = color("#68f7b8");
  shadow[shadow.length] = color("#eafa8f");

  accent[accent.length] = color("#9391ff");
  highlight[highlight.length] = color("#e0b7f8");
  shadow[shadow.length] = color("#c2bcf7");

  accent[accent.length] = color("#f48cff");
  highlight[highlight.length] = color("#e6b8f9");
  shadow[shadow.length] = color("#e6b8f9");

  accent[accent.length] = color("#efb770");
  highlight[highlight.length] = color("#efb770");
  shadow[shadow.length] = color("#68f7b8");

  coreImage = createGraphics(width, height, WEBGL);
  coreImageBlurred0 = createGraphics(width, height);
  coreImageBlurred1 = createGraphics(width, height);
  coreImageBlurredCombo = createGraphics(width, height);
  softBlackPG = createGraphics(width, height);
  outerPG = createGraphics(width, height);

  runImageGen();
}

function draw() {
  background(bkgdColor);
  // orbitControl();
  // ortho();

  // image(coreImageBlurred0, 0, 0);
  image(coreImageBlurred1, 0, 0);

  // fill(0,0,255);
  // ellipse(0, 0, 5, 5);

  // for(var m = 0; m < coreCubes.length; m++){
  //   coreCubes[m].run();
  // }

  noLoop();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight, WEBGL)

  coreImage.resizeCanvas(width, height, WEBGL);
  coreImageBlurred0.resizeCanvas(width, height);
  coreImageBlurred1.resizeCanvas(width, height);
  coreImageBlurredCombo.resizeCanvas(width, height);
  softBlackPG.resizeCanvas(width, height);
  outerPG.resizeCanvas(width, height);
  runImageGen();

  loop();
}

function keyPressed(){
  runImageGen();

  loop();
}

function runImageGen(){
  // Clean up old cubes first
  // for(var m = 0; m < coreCubes.length; m++){
  //   coreCubes[m].cleanUp();
  // }
  // coreCubes = []; // Clear the array

  // Don't need to remove coreImage, just clear it
  coreImage.clear();
  coreImage.rectMode(CENTER);
  coreImage.ortho();
  coreImage.background(bkgdColor);

  rectMode(CENTER);
  imageMode(CENTER);

  makeCubeTunnel();

  for(var m = 0; m < coreCubes.length; m++){
    coreCubes[m].run();
  }

  drawcoreImageBlurred();
}

function makeCubeTunnel(){
  coreCubes = [];

  ranMin = 30;
  ranMax = 120;

  culmW = 0;
  culmH = 0;
  widthTarget = width * 1/3;
  heightTarget = height * 1/3;

  // TO RIGHT
  while(culmW < widthTarget){
    var thisSize = random(ranMin, ranMax);

    var x = culmW + thisSize/2;
    var y = culmH - thisSize/2;
    var s = thisSize;

    coreCubes[coreCubes.length] = new Cube(x, y, s, 0, true);

    culmW += thisSize;
  }
  coreCubes[coreCubes.length - 2].flippable = false;
  coreCubes[coreCubes.length - 1].flippable = false;

  // TO DOWN
  while(culmH < heightTarget){
    var thisSize = random(ranMin, ranMax);

    var x = culmW + thisSize/2;
    var y = culmH + thisSize/2;
    var s = thisSize;

    coreCubes[coreCubes.length] = new Cube(x, y, s, 1, true);

    culmH += thisSize;
  }
  coreCubes[coreCubes.length - 2].flippable = false;
  coreCubes[coreCubes.length - 1].flippable = false;

  // TO LEFT
  var tempW = 0
  while(tempW < culmW - ranMax){
    var thisSize = random(ranMin, ranMax);

    var x = culmW - tempW - thisSize/2;
    var y = culmH + thisSize/2;
    var s = thisSize;

    coreCubes[coreCubes.length] = new Cube(x, y, s, 2, true);

    tempW += thisSize;
  }
  coreCubes[coreCubes.length - 1].flippable = false;

  // FINISH LEFT
  var leftoverSize = culmW - tempW;
  var x = leftoverSize/2;
  var y = culmH + leftoverSize/2;
  var s = leftoverSize;

  coreCubes[coreCubes.length] = new Cube(x, y, s, 2, false);

  // TO UP
  var tempH = 0;
  while(tempH < culmH - ranMax){
    var thisSize = random(ranMin, ranMax);

    var x = -thisSize/2;
    var y = culmH - tempH - thisSize/2;
    var s = thisSize;
    coreCubes[coreCubes.length] = new Cube(x, y, s, 3, true);

    tempH += thisSize;
  }
  coreCubes[coreCubes.length - 1].flippable = false;

  // FINISH UP
  var leftoverSize = culmH - tempH;
  var x = -leftoverSize/2;
  var y = leftoverSize/2;
  var s = leftoverSize;

  coreCubes[coreCubes.length] = new Cube(x, y, s, 3, false);

  /////////////
  // TWEAK ALL
  /////////////
  for(var m = 0; m < coreCubes.length; m++){
    // CENTER
    coreCubes[m].x -= culmW/2;
    coreCubes[m].y -= culmH/2;

    // POSSIBLE FLIP
    if(random(10) < 6.6){
      coreCubes[m].flip();
    }

    // BUILD EXTRUSION
    coreCubes[m].build();
  }
}
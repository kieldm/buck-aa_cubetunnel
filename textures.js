//////////////////////////////////////////////
/////////////////////////////       DRAW
//////////////////////////////////////////////

function drawGrad(aCol, hCol, sCol, sizer){   // straight text
  var w = 1000;
  var h = sizer;

  thisPG = createGraphics(w, h, P2D);
  thisPG.background(sCol);

  for(var m = 0; m < 350; m++){
    var gradC
    if(m < 50){
      var tk0 = map(m, 0, 50, 0, 1);
      gradC = lerpColor(aCol, hCol, tk0);
    } else {
      var tk0 = map(m, 50, 350, 0, 1);
      gradC = lerpColor(hCol, sCol, tk0);
    }

    thisPG.noFill();
    thisPG.stroke(gradC);
    thisPG.line(m, 0, m, h);
  }

  return thisPG
}



function drawCoreImageBlurred(){
  // var w = holdW * 1.1;
  var w = width;
  var h = height;
  // var h = (inputText.length) * pgTextSize * tFontFactor[selFont] * 1.1;

  // var corePG = createGraphics(w, h);
  // corePG.background(0);
  // corePG.noStroke();
  // // pg[p].fill(colorSet[p%colorSet.length]);
  // corePG.fill(255);
  // corePG.ellipse(w/2, h/2, w/4, h);
  // corePG.pop();

  softBlackPG.clear();
  softBlackPG.noStroke();
  softBlackPG.fill(0);
  softBlackPG.ellipse(w/2, h/2, w * 3/4, h * 3/4);
  // softBlackPG.fill(255,125);
  // softBlackPG.ellipse(w/2, h/2, w * 1/2, h * 1/2);
  softBlackPG.filter(BLUR, 50);

  outerPG.clear();
  outerPG.image(coreImage, 0, 0);
  outerPG.filter(BLUR, 3.5);
  outerPG.image(softBlackPG, 0, 0);

  // coreImageBlurred = createGraphics(coreImage.width, coreImage.height);
  coreImageBlurred.clear();
  coreImageBlurred.background(0);

  ///////// ADD RADIAL blur
  var radialRes = 60;
  for(var m = 0; m < radialRes; m++){
    var rad = map(m, 0, radialRes, dist(coreImage.width/2, coreImage.height/2, coreImage.width, coreImage.height), 100) * 2;

    coreImageBlurred.push();
      coreImageBlurred.beginClip();
        coreImageBlurred.ellipse(coreImage.width/2, coreImage.height/2, rad + 1, rad + 1);
      coreImageBlurred.endClip();

      coreImageBlurred.image(coreImage, 0, 0);

    coreImageBlurred.pop();
    
    var tk0 = map(m,0, radialRes, 0, 1);
    if(bleed > 0){
      var blurMag = map((tk0), 0, 1, 0, bleed);
      coreImageBlurred.filter(BLUR, blurMag);
    }

  }
  for(var m = 0; m < radialRes; m++){
    var radW = map(m, 0, radialRes, coreImage.width * 2, coreImage.width * 0.7);
    var radH = map(m, 0, radialRes, coreImage.height * 2, coreImage.height * 0.7);

    coreImageBlurred.push();
      coreImageBlurred.beginClip();
        coreImageBlurred.ellipse(coreImage.width/2, coreImage.height/2, radW + 1, radH + 1);
      coreImageBlurred.endClip();

      coreImageBlurred.image(coreImage, 0, 0);

    coreImageBlurred.pop();
    
    var tk0 = map(m,0, radialRes, 0, 1);
    if(bleed > 0){
      var blurMag = map((tk0), 0, 1, 0, bleed);
      coreImageBlurred.filter(BLUR, blurMag);
    }

  }
}
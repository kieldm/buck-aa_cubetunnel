class Cube{
  constructor(x, y, s, side, flippable){
    this.x = x;
    this.y = y;
    this.s = s;

    this.extrudeDepth = 50;

    this.pnts = [];

    this.sidesOn = [];

    this.side = side;

    this.flippable = flippable;
    
    // var ranSelector = int(random(accent.length));
    // this.aCol = accent[ranSelector];
    // this.hCol = highlight[ranSelector];
    // this.sCol = shadow[ranSelector];

    this.aCol = accent[int(random(accent.length))];
    this.hCol = highlight[int(random(accent.length))];
    this.sCol = shadow[int(random(accent.length))];
    this.pg = drawGrad(this.aCol, this.hCol, this.sCol, this.s);
  }

  build(){
    var maxDist = dist(0, 0, width/2, height/2);

    // TL
    var tl = createVector(this.x - this.s/2, this.y - this.s/2);
    var tlAng = atan2(tl.y, tl.x);
    var tlOut = createVector(tl.x + cos(tlAng) * maxDist, tl.y + sin(tlAng) * maxDist);

    // TR
    var tr = createVector(this.x + this.s/2, this.y - this.s/2);
    var trAng = atan2(tr.y, tr.x);
    var trOut = createVector(tr.x + cos(trAng) * maxDist, tr.y + sin(trAng) * maxDist);

    // BR
    var br = createVector(this.x + this.s/2, this.y + this.s/2);
    var brAng = atan2(br.y, br.x);
    var brOut = createVector(br.x + cos(brAng) * maxDist, br.y + sin(brAng) * maxDist);

    // BL
    var bl = createVector(this.x - this.s/2, this.y + this.s/2);
    var blAng = atan2(bl.y, bl.x);
    var blOut = createVector(bl.x + cos(blAng) * maxDist, bl.y + sin(blAng) * maxDist);

    this.pnts[0] = [];
    this.pnts[0][0] = createVector(tl.x, tl.y, 0);      
    this.pnts[0][1] = createVector(tr.x, tr.y, 0);
    this.pnts[0][2] = createVector(br.x, br.y, 0);
    this.pnts[0][3] = createVector(bl.x, bl.y, 0);
    this.pnts[1] = [];
    this.pnts[1][0] = createVector(tlOut.x, tlOut.y, this.extrudeDepth);      
    this.pnts[1][1] = createVector(trOut.x, trOut.y, this.extrudeDepth);   
    this.pnts[1][2] = createVector(brOut.x, brOut.y, this.extrudeDepth);   
    this.pnts[1][3] = createVector(blOut.x, blOut.y, this.extrudeDepth);


    for(var m = 0; m < 4; m++){
      this.sidesOn[m] = false;
    }

    this.sidesOn[this.side] = true;

    if(this.pnts[0][0].x < 0){
      this.sidesOn[3] = true;
    }
    if(this.pnts[0][1].x > 0){
      this.sidesOn[1] = true;
    }
    if(this.pnts[0][0].y < 0){
      this.sidesOn[0] = true;
    }
    if(this.pnts[0][2].y > 0){
      this.sidesOn[2] = true;
    }
  }

  run(){
    this.update()
    // this.displayDebug();

    this.display();
  }

  flip(){
    if(this.flippable){
      if(this.side == 0){
        this.y += this.s;
      } else if(this.side == 1){
        this.x -= this.s;
      } else if(this.side == 2){
        this.y -= this.s;
      } else {
        this.x += this.s;

      }
    }
  }

  update(){

  }

  displayDebug(){
    noFill();
    stroke(0,0,255);

    push();
      translate(this.x, this.y);

      rect(0, 0, this.s, this.s);

    pop();

    line(this.x, this.y, this.outerX, this.outerY);
  }

  display(){
    coreImage.image(this.pg, 4000, 0);
    // fill(bkgdColor);
    // stroke(foreColor);
    for(var m = 0; m < 4; m++){
      if(this.sidesOn[m]){
        var thisOne = m;
        var nextOne = (m+1)%4;

        coreImage.noStroke();
        coreImage.texture(this.pg);
        coreImage.beginShape();
          coreImage.vertex(this.pnts[0][thisOne].x, this.pnts[0][thisOne].y, this.pnts[0][thisOne].z, 0, 1);
          coreImage.vertex(this.pnts[0][nextOne].x, this.pnts[0][nextOne].y, this.pnts[0][nextOne].z, 0, 0);
          coreImage.vertex(this.pnts[1][nextOne].x, this.pnts[1][nextOne].y, this.pnts[1][nextOne].z, 1, 0);
          coreImage.vertex(this.pnts[1][thisOne].x, this.pnts[1][thisOne].y, this.pnts[1][thisOne].z, 1, 1);
        coreImage.endShape(CLOSE);
      }
    }

    // BUILD CAP
    // stroke(255);
    coreImage.fill(this.aCol);
    coreImage.rect(this.x, this.y, this.s, this.s);

    if(this.pg != null){
      console.log("PG CLEARED");
      this.pg.remove();
      this.pg = null;
    }

  }

}
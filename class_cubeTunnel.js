class CubeTunnel {
  constructor(){
    this.sqrs = [];

    this.ranMin = 75;
    this.ranMax = 150;

    this.culmW = 0;
    this.culmH = 0;
    this.widthTarget = width * 1/3;
    this.heightTarget = height * 1/3;

    this.build();
  }

  build(){
    var flipProb = 5; // out of 10

    

  }

  run(){
    this.update();
    this.display();
  }

  update(){

  }

  display(){

    push();
      translate(-this.culmW/2, -this.culmH/2);


      noFill();
      stroke(0,0,255);

      console.log(this.sqrs.length)
      for(var m = 0; m < this.sqrs.length; m++){
        push();
          translate(this.sqrs[m].x, this.sqrs[m].y);

          ellipse(0, 0, 5, 5);
          rect(0, 0, this.sqrs[m].s, -this.sqrs[m].s);
        pop();
      }
    pop();
  }
}
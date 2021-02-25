

// this class describes the properties of a single particle.
class Particle {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.
  constructor(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(6,80);
    this.xSpeed = random(-0.5,0.5);
    this.ySpeed = random(-0.3,1.5);
  }

// creation of a particle.
  createParticle() {
    noStroke();
    fill('rgba(200,169,169,0.4)');
    circle(this.x,this.y,this.r);
  }

// setting the particle in motion.
  moveParticle() {
    if(this.x < 0 || this.x > width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }

// this function creates the connections(lines)
// between particles which are less than a certain distance apart
  joinParticles(particles) {
    particles.forEach(element =>{
      let dis = dist(this.x,this.y,element.x,element.y);
      if(dis<85) {
        stroke('rgba(144, 12, 63,0.2)');
        line(this.x,this.y,element.x,element.y);
      }
    });
  }
}

//text with cursor
let crossSize = 100;

// an array to add multiple particles
let particles = [];

// an array for box numbers
let arr = [];

function setup() {
  createCanvas(1300, 600);
  for(let i = 0;i<width/10;i++){
    particles.push(new Particle());
  }

  for(let i =1; i<313; i++){
  arr.push(i);
 }

}


function draw() {

  background('#9E355C');


  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }

  //grid boxes
   textAlign(CENTER, CENTER);

    for (let y = 0; y < 12; y++) {
      for (let x = 0; x < 26; x++) {
        let xpos = x *50;
        let ypos = y *50;

        let index = y * 26 + x; // find the index

        if( inside(xpos, ypos, 50,50) ){
          // were inside
          fill('rgba(144, 12, 63, 0.7)');
        } else {
          // not inside
            noFill();
        }

        stroke('rgba(144, 12, 63, 0.7)');
        strokeWeight(0.3);
        rect(xpos, ypos, 50, 50);
        fill('rgba(144, 12, 63, 1)');
        noStroke();
        text(arr[index], xpos, ypos, 50, 50);

      }
    }

    function inside(x, y, w, h){
     if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
      return true;
     } else {
      return false;
     }
    }


  //styles for crosshair
  strokeWeight(60);
  textAlign(LEFT, LEFT);
  let mousePosition = "(" + round(mouseX) + "," + round(mouseY) + ")";

 noStroke();
 fill('rgba(218, 247, 166, 0.6)');
 textSize(80);
 text(mousePosition, mouseX + 10, mouseY - 50);

 stroke('rgba(255, 195, 0, 1)');
 strokeWeight(2);
 line(mouseX - crossSize, mouseY, mouseX + crossSize, mouseY);
 line(mouseX, mouseY - crossSize, mouseX, mouseY + crossSize);

 fill('rgba(217, 217, 217, 0.6)');
 noStroke();
 rect(75, 40, 400, 500, 60, 20, 40, 5);

 fill(70);
 textSize(14);
 text(mousePosition, 150, 150);


}

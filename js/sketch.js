

// this class describes the properties of a single particle.
class Particle {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.
  constructor(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(6,40);
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
        stroke('rgba(255,255,255,0.04)');
        line(this.x,this.y,element.x,element.y);
      }
    });
  }
}

//text with cursor
let crossSize = 100;

// an array to add multiple particles
let particles = [];

//background gradient colors
let c1,c2;


function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0;i<width/10;i++){
    particles.push(new Particle());
  }
  textSize(80);
  fill(100);

}

function draw() {
  background('#9E355C');
  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }
  //styles for point
  smooth();
  fill(120);
  //stroke(40, 200, 100);
  strokeWeight(60);
  point(mouseX, mouseY);
  let mousePosition = "(" + mouseX + "," + mouseY + ")";

 noStroke();
 fill('rgba(218, 247, 166, 0.6)');
 text(mousePosition, mouseX + 5, mouseY - 5);

 stroke('rgba(255, 195, 0, 0.3)');
 strokeWeight(2);
 line(mouseX - crossSize, mouseY, mouseX + crossSize, mouseY);
 line(mouseX, mouseY - crossSize, mouseX, mouseY + crossSize);
}

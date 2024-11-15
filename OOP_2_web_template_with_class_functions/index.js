let currentPage = 1
let pages //array med alle elementer med class = page 


class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xSpeed = random(-6, 6);
    this.ySpeed = random(-6, 6);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // Kontrollerer grænserne for at få cirklerne til at bounce
    if (this.x + this.radius > width || this.x - this.radius < 0) this.xSpeed *= -1;
    if (this.y  + this.radius > height || this.y - this.radius < 0) this.ySpeed *= -1;
  }

  display() {
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
}

let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (i of new Array(5)) {
    circles.push(new Circle(random(width), random(height), random(20, 50)));
  }
}

function draw() {
  clear()
  for(c of circles){
    c.move();  // Kalder `move()` for at flytte cirklen
    c.display();
  }
}

// Vi tilføjer metoden `move()` til klassen for at få cirklerne til at bevæge sig. De bouncer fra kanterne af canvas.
function shiftPage(num){
    pages = selectAll('.page')
    if(num == "ArrowLeft"){
        num = currentPage - 1
    }
    if(num == "ArrowRight"){
        num = currentPage + 1
    }

    if(isNaN(num) || num > pages.length || num == 0){
        return
    }
    select("#page" + currentPage).removeClass('visible')
    currentPage = num
    select("#page" + currentPage).addClass('visible')
}

function keyPressed(){
    console.log(key)
    shiftPage(key)
}


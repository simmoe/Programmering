let currentPage = 1
let pages //array med alle elementer med class = page 

class Circle {
    constructor(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
    }
  
    display() {
      ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    }
  }
  
  let circles = []; // Array til at gemme flere cirkler
  
  function setup() {
    createCanvas(windowWidth, windowHeight)

    // Opretter flere `Circle` objekter
    for (i of new Array(5)) {
      circles.push(new Circle(random(width), random(height), random(20, 50)));
    }
  }
  
  function draw() {
    circles.forEach(circle => circle.display());
  }
  
  // Klassen har en constructor, der definerer egenskaberne `x`, `y` og `radius`.
  // Vi opretter flere cirkler ved hjælp af et array og tegner dem alle i `draw()`.


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


let currentPage = 1;
let pages; // array med alle elementer med class = page
let showResults = false;
let posts = []; // Her opbevares reddit posts
let redditPosts = []; // Liste af RedditPost objekter

class RedditPost {
  constructor(title, author, url, score, thumbnail, x, y) {
    this.title = title;
    this.author = author;
    this.url = url;
    this.score = score;
    this.thumbnail = thumbnail == 'self' ? null : loadImage(thumbnail);  // Indlæser thumbnail
    this.x = x || random(50, windowWidth - 50);
    this.y = y || random(50, windowHeight - 50);
    this.xSpeed = random(-3, 3);
    this.ySpeed = random(-3, 3);
    this.size = random(50, 100); // Tilføjet tilfældig størrelse til cirklen
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // Bounce fra kanterne
    if (this.x > windowWidth || this.x < 0) {
      this.xSpeed *= -1;
    }
    if (this.y > windowHeight || this.y < 0) {
      this.ySpeed *= -1;
    }
  }

  display() {
    // Tegner thumbnail som billede
    if (this.thumbnail) {
      image(this.thumbnail, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);  // Thumbnail placeres i cirklen
    } else {
      // Tegn en standard ellipse, hvis thumbnail ikke kan indlæses
      fill(255, 0, 0);
      ellipse(this.x, this.y, this.size);
    }

    // Tegner tekst ovenpå billedet
    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(`${this.title} by ${this.author}`, this.x, this.y + this.size / 2 + 10);  // Placerer tekst under cirklen
  }
}

class RedditAPIHandler {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetchPosts(subreddit) {
    const response = await fetch(`${this.baseURL}/${subreddit}/hot.json`);
    const data = await response.json();
    return data.data.children  // Returnerer dataen fra API’et
  }
}

function setup() {
  noCanvas();
  let apiHandler = new RedditAPIHandler('https://www.reddit.com/r');

  select('#searchButton').mousePressed(async function(){
    let subreddit = select('#query').value()
    const posts = await apiHandler.fetchPosts('javascript');  // Await for at hente data
    console.log(posts);  // Logger alle posts fra subreddit
  })
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100, 100, 100, 100);

  let apiHandler = new RedditAPIHandler('https://www.reddit.com/r');

  // Når der trykkes på søgeknappen, hentes posts fra det valgte subreddit
  select('#searchButton').mousePressed(async function () {
    let subreddit = select('#query').value()
    let posts = await apiHandler.fetchPosts(subreddit)  // Await for at hente data
    posts = posts.slice(0, 10); // Vi tager de 10 første posts
    showResults = true

    //console.log('henetede poster ', posts[0])

    redditPosts = []
    // Opret et RedditPost objekt for hver post
    for(p of posts) {
      redditPosts.push ( new RedditPost(p.data.title, p.data.author, p.data.url, p.data.score, p.data.thumbnail) )
    }

  })
}

function draw() {
  if (showResults) {
    background(100, 100, 100); // Forny baggrunden

    // Bevæger og viser alle RedditPost objekter
    for (let post of redditPosts) {
      post.move()
      post.display()
    }
  }
}

function shiftPage(num) {
  pages = selectAll('.page');
  if (num == 'ArrowLeft') {
    num = currentPage - 1;
  }
  if (num == 'ArrowRight') {
    num = currentPage + 1;
  }

  if (isNaN(num) || num > pages.length || num == 0) {
    return;
  }
  select('#page' + currentPage).removeClass('visible');
  currentPage = num;
  select('#page' + currentPage).addClass('visible');
}

function keyPressed() {
  console.log(key);
  shiftPage(key);
}
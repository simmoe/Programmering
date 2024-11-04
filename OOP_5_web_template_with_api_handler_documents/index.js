let currentPage = 1
let pages //array med alle elementer med class = page 
let showResults = false 



class RedditPost {
  constructor(title, author, url, score, thumbnail) {
    this.title = title;
    this.author = author;
    this.url = url;
    this.xSpeed = random(-6, 6);
    this.ySpeed = random(-6, 6);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }


  display(x, y) {
    fill(0);
    textSize(12);
    text(`${this.title} by ${this.author} (Score: ${this.score})`, x, y);
  }
}

// Klassen `RedditPost` opbevarer information og har en `display()` metode til at vise postens detaljer i canvas.

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
    let apiHandler = new RedditAPIHandler('https://www.reddit.com/r');
    const posts = await apiHandler.fetchPosts('javascript');  // Await for at hente data
    console.log(posts);  // Logger alle posts fra subreddit
  })

  let post = new RedditPost("Example Title", "AuthorName", "https://reddit.com", 120);
  post.display(10, 20);

}  


// Klassen `RedditAPIHandler` hjælper os med at hente data fra Reddit API’et.


function draw(){
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


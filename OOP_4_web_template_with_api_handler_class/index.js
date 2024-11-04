let currentPage = 1
let pages //array med alle elementer med class = page 


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
}

// Klassen `RedditAPIHandler` hjælper os med at hente data fra Reddit API’et.





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


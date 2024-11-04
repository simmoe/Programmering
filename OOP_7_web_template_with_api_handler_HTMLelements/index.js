let currentPage = 1;
let pages; // array med alle elementer med class = page
let showResults = false;
let posts = []; // Her opbevares reddit posts
let redditPosts = []; // Liste af RedditPost objekter


function setup() {
  let apiHandler = new RedditAPIHandler('https://www.reddit.com/r');

  // Når der trykkes på søgeknappen, hentes posts fra det valgte subreddit
  select('#searchButton').mousePressed(function () {
    let subreddit = select('#query').value();
    apiHandler.fetchPosts(subreddit).then(data => {
      let posts = data.slice(0, 10); // Vi tager de 10 første posts

      // Fjern tidligere viste poster
      redditPosts.forEach(post => post.postContainer.remove());
      redditPosts = [];

      // Opret et RedditPost objekt for hver post
      redditPosts = posts.map(post => {
        return new RedditPost({
          title: post.title,
          author: post.author,
          score: post.score,
          thumbnail: post.thumbnail || "https://via.placeholder.com/100" // Brug placeholder hvis thumbnail mangler
        }, select('#posts'));
      });
    });
  });
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
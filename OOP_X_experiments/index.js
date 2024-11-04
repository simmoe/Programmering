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

async function setup() {
  noCanvas();
  let apiHandler = new RedditAPIHandler('https://www.reddit.com/r');
  const posts = await apiHandler.fetchPosts('javascript');  // Await for at hente data
  console.log(posts);  // Logger alle posts fra subreddit
}

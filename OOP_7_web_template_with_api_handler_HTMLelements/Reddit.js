class RedditPost {
    constructor(data) {
      this.title = data.title;
      this.author = data.author;
      this.score = data.score;
      this.thumbnail = data.thumbnail; // Tilføj thumbnail til data
  
      // Opret en container div til hver post
      this.postContainer = createElement('div');
      this.postContainer.addClass('post'); // Tilføj klassen 'post' for styling
  
      // Opret et element til thumbnail
      this.thumbnailElement = createElement('img');
      this.thumbnailElement.attribute('src', this.thumbnail);
      this.postContainer.child(this.thumbnailElement);
  
      // Opret et element til titlen
      this.titleElement = createElement('h2', this.title);
      this.postContainer.child(this.titleElement);
  
      // Opret et element til forfatter og score
      this.footer = createElement('div');
      this.footer.addClass('post-footer'); // Tilføj klasse til styling
      this.authorElement = createElement('span', `By: ${this.author}`);
      this.scoreElement = createElement('span', `Score: ${this.score}`);
  
      // Tilføj forfatter og score til footer
      this.footer.child(this.authorElement);
      this.footer.child(this.scoreElement);
  
      // Tilføj footer til containeren
      this.postContainer.child(this.footer);
  
      // Tilføj posten til div'en med id "posts"
      select('#posts').child(this.postContainer);
    }
  }

  class RedditAPIHandler {
    constructor(baseURL) {
      this.baseURL = baseURL;
    }
  
    async fetchPosts(subreddit) {
      try {
        const response = await fetch(`${this.baseURL}/${subreddit}/hot.json`);
        const data = await response.json();
        return data.data.children.map(post => post.data);
      } catch (error) {
        console.error('Error fetching data from Reddit:', error);
      }
    }
  }
  

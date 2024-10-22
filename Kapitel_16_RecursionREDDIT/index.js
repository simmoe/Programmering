function setup() {
  noCanvas();
  fetchRedditComments('interestingasfuck', '1fpsapm');  // Subreddit og post-id fra eksemplet
}


async function fetchRedditComments(subreddit, postId) {
    const url = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`;
    const response = await fetch(url)
    const data = await response.json()

    console.log(data) 
    createElement('h1', data[0].data.children[0].data.title) 
    createImg(data[0].data.children[0].data.thumbnail, 'Se mig')
    //Vi behandler kommentarer i en rekursiv funktion
    const comments = data[1].data.children; // Kommentarer er i det andet element i JSON arrayet
    displayComments(comments, 0);
  }
  
  function displayComments(comments, level) {
    comments.forEach(comment => {
      const indent = '—'.repeat(level);
      createDiv(`${indent} ${comment.data.author}: ${comment.data.body}`).addClass('comment ' + "level" + level);
  
      if (comment.data.replies) {
        displayComments(comment.data.replies.data.children, level + 1);
      }
    });
  }
  
  
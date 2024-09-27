function setup(){
    hentTopPosts("cats");
    // Kalder funktionen 'hentTopPosts' med argumentet "cats" ved programmets start.
}

async function hentTopPosts(subreddit) {
    try {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=5`);
        // Bruger 'fetch' til at hente data fra Reddit API'et for den angivne 'subreddit'.
        // 'await' venter på, at 'fetch' anmodningen fuldføres.

        const data = await response.json();
        // Parser responsen til JSON-format.
        // 'await' venter på, at parsing er færdig.

        const posts = data.data.children;
        // Ekstraherer arrayet af indlæg fra den modtagne data.

        console.log(`Top 5 indlæg fra r/${subreddit}:`);
        for (const post of posts) {
            createPost(post.data);
            // Itererer over hvert indlæg og kalder 'createPost' for at oprette det på siden.
        }
    } catch (fejl) {
        console.error('Der opstod en fejl:', fejl);
        // Håndterer eventuelle fejl, der opstår under hentningen af data.
    }
}

function createPost(post){
    console.log(post);
    // Logger hele indlægsobjektet til konsollen for debugging.

    let htmlDiv = select('#page1 .right');
    // Vælger HTML-elementet, hvor indlægget skal indsættes (den højre kolonne).

    let container = createElement('div').addClass('post');
    // Opretter et nyt 'div' element og tilføjer klassen 'post' for styling.

    container.style('background-image', `url(${post.thumbnail})`);
    // Sætter baggrundsbilledet til indlæggets thumbnail.

    let title = createElement('h2', post.title);
    // Opretter et 'h2' element med indlæggets titel.

    let author = createElement('p', post.author).addClass('author');
    // Opretter et 'p' element med forfatterens navn og tilføjer klassen 'author'.

    container.child(title);
    container.child(author);
    // Tilføjer 'title' og 'author' elementerne som børn til 'container'.

    htmlDiv.child(container);
    // Tilføjer hele 'container' til den valgte HTML-div, så det vises på siden.
} 

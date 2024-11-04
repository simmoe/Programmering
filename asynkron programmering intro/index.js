function setup(){
    //hentTopPosts("");
    //Kalder funktionen 'hentTopPosts' med argumentet "cats" ved programmets start.
    select('#searchButton').mousePressed( function(){
        subreddit = select('#searchInput').value()
        hentTopPosts( subreddit )
    } )
}

//async betyder at funktionen kan vente på at ting er færdige - fx at hente data
async function hentTopPosts(subreddit) {

    //lad os først tømme HTMl DIV'en 
    select('#page1 .right').html('')

    //først sætter vi et repsonse objekt lig metoden fetch som henter data 
    //det tager noget tid, derfor keywordet "await"
    try { 
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=8`)
        //når vi så får det objekt tilbage, og HVIS repsonse.ok = true
        //så kan vi bruge metoden .json() til at læse en readable stream 
        //den operation tager OGSÅ noget tid - derfor keywordet "await" IGEN 
        const json = await response.json()
            //og SÅ kan vi bruge data fra serveren i json format
            console.log(json.data.children)
            //posts er et array med poster fra json objektet 
            let posts = json.data.children
            //vi løber arrayet med poster igennem 
            for( p of posts ){
                //og nu kan vi logge forskellige egenskaber ved hver post til konsollen 
                console.log(p.data.title)
                console.log(p.data.url)
                console.log(p.data.ups)
                console.log(p.data.thumbnail)
                console.log(p.data.author)
                createPost(p.data)
            }
        } catch( e ){   
            console.log('det skete en fejl', e)
            select('#page1 .right').html('Der findes ikke en subreddit med det navn')
        }
    }
        
        
function createPost(post){
    //vi laver først en reference til det HTML element vi vil sætte poster ind i 
    let rightDiv = select('#page1 .right')
    //lad os give posten en container
    let container = createDiv().addClass('post')
    //lad os give den en titel 
    let title = createElement('h1', post.title)
    //hver gang jeg har lavet et element, skal det ind i containeren
    container.child(title)
    //vi laver et link til posten på nettet 
    let link = createA(post.url, 'Læs mere..')
    //lægger det ind i containeren 
    container.child(link)
    //så laver vi billedet som baggrund til containeren
    container.style('background-image', `url(${post.thumbnail})`)
    //og lægger containeren ind i HTML dokumentet
    rightDiv.child(container)
}   
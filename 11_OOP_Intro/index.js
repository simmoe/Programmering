

function setup(){
    //Variablen c, er en ny instans af klassen Clock, som får div'en #clock med i sin constructor
    //json objekt med styling parametre sendes som det andet argument 
    let style = {
        background: 'black',
        shape:'circle'
    }
    let c = new Clock( select('#clock') , style)
    c.start()
}
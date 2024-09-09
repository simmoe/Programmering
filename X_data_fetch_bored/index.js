let currentPage = 3

let pages //array med alle elementer med class = page 
let menuItems //array med alle menupunkterne  

function setup(){
    setupMenuStructure()
}

function setupMenuStructure(){
    pages = selectAll('.page')
    menuItems = selectAll('.menuitem')

    //menu items skal reagere ved at skifte side
    for( m of menuItems ){
        m.mousePressed( function(e) {
            //e.target er selve html div'en 
            console.log(e.target.id)
            //slice -1 henter det sidste bogstav i en string
            let nr = e.target.id.slice(-1)
            //nu kan vi kalde shiftPage som skifter side
            shiftPage(nr)
        })
    }

    //shiftPage er funktionen der tager et tal og skifter til en side        
    shiftPage(currentPage)
    //vent to sekunder og sæt så klassen "hidden" på headeren - så menuen bliver væk
    setTimeout(function(){
        select('header').addClass('hidden')
    }, 10000)

}

function pageTwo(){
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(
            function(response){
                //lad os tjekke om serverens response er okay
                console.log(response)
                return response.json()
            }
        )
        .then(
            function (data){
                //vi har nu en random drink
                console.log(data)
                let drink = data.drinks[0]

                //Vi sletter først den eksisterende drink på siden
                select('#page2 .left').html('')

                //Lad os indsætte den på side 2
                let title = createElement('h1', drink.strDrink)
                let description = createElement('p', drink.strInstructions)

                //vi laver en container til al teksten 
                let container = createElement('div')
                container.child(title)
                container.child(description)

                //til sidst lægger vi teksten ind til venstre på siden 
                select('#page2 .left').child(container)

                //indsæt billede til højre
                select('#page2 .right').style('background-image', 'url(' + drink.strDrinkThumb + ')')
            }
        )
}


function pageThree(){
    //array til resultater
    let drinks = []

    //søge knappen 
    let b = select('#searchButton')

    b.mousePressed(function(){
        //hent tekstfelt
        let q = select('#query').value()
        console.log(q)
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + q)
        .then(
            function(response){
                return response.json()
            }
        )
        .then(
            function (data){
                //vi har nu en liste med resultater
                console.log(data)
                drinks = data.drinks
                
                //opret en HTML liste 
                let list = createElement('ol')

                for(drink of drinks){
                    console.log('Føjer drink til listen: ' + drink.strDrink )
                    let li = createElement('li', drink.strDrink)
                    list.child(li)
                }
                //Udskift højre side med listen
                select('#page3 .right').html('')
                select('#page3 .right').child(list)
            }
        )
    })
}

function shiftPage(num){
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
    select("#menu" + currentPage).removeClass('active')
    currentPage = num
    select("#page" + currentPage).addClass('visible')
    select("#menu" + currentPage).addClass('active')

    if(currentPage == 2) {
        pageTwo()
    }
    if(currentPage == 3) {
        pageThree()
    }
}



function keyPressed(){
    console.log(key)
    shiftPage(key)
}




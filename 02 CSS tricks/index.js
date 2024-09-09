let currentPage = 4
let pages //array med alle elementer med class = page 
let menu //array med menupunkter 

function setup(){
    console.log('P5.js er loaded')
    select('#page' + currentPage).addClass('visible')
    pages = selectAll('.page')
    //nu kan man se at pages er blevet til en liste med alle class = page ting
    console.log(pages.length)

    //handle menu
    menu = selectAll('.menuitem')
    for(let i = 0; i < menu.length; i++){
        menu[i].mousePressed(
            function(){
                shiftPage(i + 1)
            }
        )
    }
}
function shiftPage(num){
    console.log(num, 'shiftpage')
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


//lad os lave et spil, hvor man først får vist to farver i en bestemt rækkefølge
//bagefter skal man trykke på to knapper i samme rækkefølge

//array med en rækkefølge
let colors = ['blue', 'green', 'green', 'green', 'blue', 'blue', 'green']

//variabler i html 
let header, button

//denne variabel bruges til at håndtere mqtt
let client 

//state variabel til at sture logikken
let state = 'setup'

//variabel der bestemmer vhilken farve der vises/skal trykkes på nu
let currentColor = 0

function setup() {
  header = select('#header')
  button = select('#startButton')

  button.mousePressed( () => showColors(0) )

  createCanvas(windowWidth, windowHeight)

  //vi kan bruge mqtt.connect fordi vi har inkluderet mqtt.js i HTML filen
  client = mqtt.connect('wss://mqtt.nextservices.dk')

  //on er en asynkron EVENT, som kaldes når vi får en besked fra mqtt serveren 
  client.on('connect', function(svar){
    console.log(svar, 'serveren er klar til mqtt kommunikation')
  })

  //nu vil vi gerne subscribe på et emne
  client.subscribe('state_machine') 

  //og så skal vi sætte den LISTENER op som skal modtage input fra MQTT
  client.on('message', function(emne, besked){
    //emnet kommer som en string 
    console.log(emne)
    //beskeden skal vi lige parse før vi kan læse den
    console.log(besked.toString())
    //det vi får fra m5'eren er i det her eksempel JSON format 
  })
}
//rekursiv funktion der kalder sig selv
function showColors( position ){
  //sæt state
  state = 'colors'
  //først sætter vi currentColor
  currentColor = position
  console.log(colors[position])
  if(position < colors.length - 1 ){
    setTimeout( () => showColors(position + 1), 1000 )
  }
}

function draw(){
  clear()
  if(state == 'setup'){
    header.html('Husk farvernes rækkefølge')
  }
  if(state == 'colors'){
    header.html(`Husk farve: ${currentColor + 1}`)
    fill(colors[currentColor])
    noStroke()
    ellipse(width/2, height/2, 400)   
  }
  if(state == 'gameover'){
  }
}
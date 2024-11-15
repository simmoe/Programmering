
//variabler til at indsætte i HTML 
let infoHeader, infoText, startButton

//denne variabel bruges til at håndtere mqtt
let client 

//state variablen 
let state = 'setup'

let colors = ['green', 'blue', 'blue', 'blue', 'green', 'green', 'blue', 'green']
let currentColor = 'red'

let timer = 10

function setup() {
  createCanvas(windowWidth, windowHeight)

  //tag fat i de to HTML elementer vi vil modificere 
  infoHeader = select('#infoHeader')
  infoText = select('#infoText')
  startButton = select('#startButton')
  startButton.mousePressed(function(){
    state = 'showColors'
    showColors(0)
  })

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
  })
}

function showColors( index ){
  console.log('showColors', index)
  if(index < colors.length){
    currentColor = colors[index] 
    client.publish('reaction_game', currentColor)
    setTimeout(function(){showColors(index + 1)}, 1000)
  }
}

function draw(){
  clear()
  if(state == 'setup'){
    infoHeader.html('Reaktionsspil - regler')
    infoText.html('Tryk start for at begynde spillet. Læg mærke til knappernes rækkefølge - og gentag samme mønster')
  }
  if(state == 'showColors'){
    infoHeader.html('Husk rækkefølgen')
    infoText.html('Gør klar til at trykke på knapperne i den rigtige rækkefølge')
    startButton.hide()
    fill(currentColor)
    noStroke()
    ellipse(width/2, height/2 , 200)
  }
  if(state == 'play'){
    infoHeader.html(`Tryk - du har ${timer} sekunder`)
    infoText.html('Tryk på knapperne i den rigtige rækkefølge')
  }


}
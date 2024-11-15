
//variabler til at indsætte i HTML 
let m5NameDiv, m5StatusDiv

//denne variabel bruges til at håndtere mqtt
let client 

//state variablen 
let state

function setup() {
  createCanvas(windowWidth, windowHeight)

  //tag fat i de to HTML elementer vi vil modificere 
  m5NameDiv = select('#m5_1 header')
  m5StatusDiv = select('#m5_1 .status')

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
    let json = JSON.parse(besked.toString())
    //nu kan jeg bruge data fra JSON objektet 
    console.log(json.id, 'her er navnet fra JSON objektet')
    //SÅ kan vi opdatere HTML dokumentet 
    m5NameDiv.html(json.id)
    m5StatusDiv.html(json.state)

    state = json.state
  })
}

function draw(){
  clear()
  if(state == 'setup'){
    fill('orange')
    noStroke()
    ellipse(random(80, 120), 100, 50)
    text('setup - waiting for something', 100, 80)
  }
  if(state == 'game'){
    fill('lightblue')
    noStroke()
    ellipse(random(width/2-20, width/2 + 20), 100, 50)
    text('game ON', width/2, 80)
  }
  if(state == 'gameover'){
    fill('black')
    noStroke()
    ellipse(random(width - 120, width - 140), 100, 50)
    text('game OVER', width - 120, 80)
  }

}
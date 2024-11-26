let classContainer
let doorSound
let dataStructure = [
  {
    day:"1",
    content:"./assets/jul.jpg"
  },
  {
    day:"2",
    content:"./assets/jul.jpg"
  },
  {
    day:"3",
    content:"./assets/jul.jpg"
  },
  {
    day:"4",
    content:"./assets/jul.jpg"
  },
  {
    day:"5",
    content:"./assets/jul.jpg"
  },
  {
    day:"6",
    content:"./assets/jul.jpg"
  },
  {
    day:"7",
    content:"./assets/jul.jpg"
  },
  {
    day:"8",
    content:"./assets/jul.jpg"
  },
  {
    day:"9",
    content:"./assets/jul.jpg"
  },
] 

function preload() {
  doorSound = loadSound('./assets/doorSound.mp3')
}

function setup() {
  //HTML containeren
  calendarContainer = select('#calendar')

  //let door = new Door(calendarContainer, "12", './assets/jul.jpg', doorSound)

  for( door of dataStructure ){
    new Door(calendarContainer, door.day, door.content, doorSound)
  }
}
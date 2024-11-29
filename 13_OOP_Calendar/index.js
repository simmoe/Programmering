let classContainer
let doorSound

function preload() {
  for( door of dataStructure){
    if(door.sound){
      door.sound = loadSound(door.sound)
    }
  }
}

function setup() {
  //HTML containeren
  calendarContainer = select('#calendar')

  //let door = new Door(calendarContainer, "12", './assets/jul.jpg', doorSound)

  for( door of dataStructure ){
    DoorFactory.createDoor(calendarContainer, door)
  }
}
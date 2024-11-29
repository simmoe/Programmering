let classContainer

function preload() {
}

function setup() {
  //HTML containeren
  calendarContainer = select('#calendar')

  let b = new Being('Bamsebjørn', 1000) 
  b.introduce()

  let a = new Alien('WosniakiAlienen', 800, 'Russia')
  a.introduce()

  let h = new Human('SvenBrinkmannah', 86, 10)
  h.introduce()
  h.brag()
}


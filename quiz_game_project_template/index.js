const apiUrl = 'https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=boolean'

function setup() {
  noCanvas() // p5.js setup without canvas
  fetchQuizQuestion()
}

async function fetchQuizQuestion() {
  let res = await fetch(apiUrl)
  let json = await (res.json())
  console.log(json.results[0])
}

function displayQuestion() {
}

function checkAnswer(selected, button) {
}

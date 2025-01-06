let currentQuestion = null
let correctAnswer = ''

function setup() {
  noCanvas() // p5.js setup without canvas
  fetchQuizQuestion()
}

function fetchQuizQuestion() {
  const apiUrl = 'https://opentdb.com/api.php?amount=1&type=multiple'

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      currentQuestion = data.results[0]
      correctAnswer = currentQuestion.correct_answer
      displayQuestion()
    })
    .catch(error => console.error('Error fetching quiz question:', error))
}

function displayQuestion() {
  const questionElement = select('#question')
  const optionsContainer = select('#options')

  questionElement.html(currentQuestion.question)
  optionsContainer.html('') // Clear previous options

  const options = shuffle([...currentQuestion.incorrect_answers, correctAnswer])
  options.forEach(option => {
    const button = createButton(option)
    button.parent(optionsContainer)
    button.mousePressed(() => checkAnswer(option, button))
  })
}

function checkAnswer(selected, button) {
  if (selected === correctAnswer) {
    button.addClass('correct')
    console.log('Correct!')
  } else {
    button.addClass('incorrect')
    console.log('Incorrect.')
  }
}

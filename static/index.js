let socket = null

const medCode = document.querySelector('h2 span')
const quizOptions = document.getElementsByClassName('quiz-option')

const listeners = {};

function displayQuiz(dataset) {
  medCode.innerText = dataset.code
  for(let i = 0; i < quizOptions.length; i++) {
    quizOptions[i].innerText = dataset.options[i]
  }
}

function newQuiz(dataset, listeners, callback) {
  displayQuiz(dataset)
  Array.from(quizOptions).forEach(option => {
    option.removeEventListener('click', listeners[option.dataset.id])
    const listener = checkAnswer(dataset, option, callback)
    option.addEventListener('click', listener)
    listeners[option.dataset.id] = listener
  })
}

function checkAnswer(dataset, option, callback) {
  return function(e) {
    const optionIndex = dataset.options.indexOf(option.innerText)
    if (optionIndex === dataset.answer) {
      alert('correct')
      callback()
    } else {
      alert('wrong')
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  socket = io()

  socket.emit('newGame')

  socket.on('game', game => {
    newQuiz(game, listeners, () => socket.emit('newGame'))
  })
})

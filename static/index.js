const medCode = document.querySelector('h2 span')
const quizOptions = document.getElementsByClassName('quiz-option')

function displayQuiz(dataset) {
  medCode.innerText = dataset.code
  for(let i = 0; i < quizOptions.length; i++) {
    quizOptions[i].innerText = dataset.options[i];
  }
}

function newQuiz(dataset, callback) {
  displayQuiz(dataset)
  Array.from(quizOptions).forEach(option => {
    option.addEventListener('click', checkAnswer(dataset, dataset.options.indexOf(option.innerText), callback));
  });
}

function checkAnswer(dataset, index, callback) {
  return function(e) {
    if (index === dataset.answer) {
      alert('correct');
      callback()
    }
   else {
      alert('wrong');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const socket = io()

  socket.emit('newGame')

  socket.on('game', game => {
    newQuiz(game, () => socket.emit('newGame'))
  })
})
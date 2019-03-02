const medCode = document.querySelector('h2 span')
const quizOptions = document.getElementsByClassName('quiz-option')

function displayQuiz(dataset) {
  medCode.innerText = dataset.code
  for(let i = 0; i < quizOptions.length; i++) {
    quizOptions[i].innerText = dataset.options[i];
  }
}

function newQuiz(dataset) {
  displayQuiz(dataset)
  Array.from(quizOptions).forEach(option => {
    option.addEventListener('click', checkAnswer(dataset, dataset.options.indexOf(option.innerText)));
  });
}

function checkAnswer(dataset, index) {
  return function(e) {
    index === dataset.answer ? alert('correct') : alert('wrong');
  }
}

window.onload = newQuiz(testData);

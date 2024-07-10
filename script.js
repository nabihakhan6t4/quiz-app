const quizData = [
  [
    "Who discovered oxygen?",
    "Karl Wilhelm Scheele",
    "Michael Jackson",
    "Shahrukh Khan",
    "Hema Malini",
    0,
  ],
  [
    "What is the capital of Australia?",
    "Sydney",
    "Melbourne",
    "Canberra",
    "Perth",
    2,
  ],
  [
    "Which planet is known as the 'Morning Star'?",
    "Mars",
    "Venus",
    "Jupiter",
    "Saturn",
    1,
  ],
  [
    "Who wrote 'To Kill a Mockingbird'?",
    "Harper Lee",
    "Jane Austen",
    "Mark Twain",
    "J.K. Rowling",
    0,
  ],
  [
    "What is the largest ocean on Earth?",
    "Atlantic Ocean",
    "Indian Ocean",
    "Arctic Ocean",
    "Pacific Ocean",
    3,
  ],
  ["What is the square root of 64?", "6", "7", "8", "9", 2],
  [
    "Who developed the theory of relativity?",
    "Isaac Newton",
    "Galileo Galilei",
    "Nikola Tesla",
    "Albert Einstein",
    3,
  ],
  [
    "Which element has the chemical symbol 'O'?",
    "Gold",
    "Oxygen",
    "Silver",
    "Iron",
    1,
  ],
  [
    "Which is the longest river in the world?",
    "Amazon River",
    "Nile River",
    "Yangtze River",
    "Mississippi River",
    1,
  ],
  [
    "What is the tallest mountain in the world?",
    "K2",
    "Kangchenjunga",
    "Lhotse",
    "Mount Everest",
    3,
  ],
];

const quizTitleElement = document.getElementById("quiz-title");
const questionTextElement = document.getElementById("question-text");
const choicesContainerElement = document.getElementById("choices-container");
const submitButton = document.getElementById("submit-button");
const restartButton = document.getElementById("restart-button");
const resultsContainer = document.getElementById("results-container");
const viewAnswersButton = document.getElementById("view-answers-button");
const allAnswersContainer = document.getElementById("all-answers");
const timerElement = document.getElementById("timer");
const timerHintElement = document.getElementById("timer-hint");
const scoreDisplayElement = document.getElementById("score-display");
const answersModal = document.getElementById("answers-modal");
const modalAnswersElement = document.getElementById("modal-answers");
const closeBtn = document.getElementsByClassName("close")[0];

// Sound effects
const correctSound = new Audio("correct.mp3");
const incorrectSound = new Audio("incorrect.mp3");

let currentQuestionIndex = 0;
let userChoices = [];
let score = 0;
let timerSeconds = 60;
let timerInterval;

function initializeQuiz() {
  showQuestion();
  startTimer();
}

function showQuestion() {
  if (currentQuestionIndex < quizData.length) {
    const currentQuestion = quizData[currentQuestionIndex];
    quizTitleElement.textContent = "Kon Bnega Crorepati Quiz";
    questionTextElement.textContent = currentQuestion[0];
    choicesContainerElement.innerHTML = "";
    for (let i = 1; i <= 4; i++) {
      const choiceButton = document.createElement("button");
      choiceButton.classList.add("choice");
      choiceButton.textContent = currentQuestion[i];
      choiceButton.setAttribute("data-index", i - 1);
      choiceButton.addEventListener("click", handleChoice);
      choicesContainerElement.appendChild(choiceButton);
    }
  } else {
    endQuiz();
  }
}

function handleChoice(event) {
  const selectedChoiceIndex = parseInt(event.target.getAttribute("data-index"));
  userChoices.push(selectedChoiceIndex);

  const correctAnswerIndex = quizData[currentQuestionIndex][5];
  if (selectedChoiceIndex === correctAnswerIndex) {
    score++;
    playSound("correct");
  } else {
    playSound("incorrect");
  }

  currentQuestionIndex++;
  showQuestion();
}

function endQuiz() {
  clearInterval(timerInterval);
  timerHintElement.style.display = "none";
  resultsContainer.style.display = "block";
  submitButton.style.display = "none";
  restartButton.style.display = "inline-block";
  viewAnswersButton.style.display = "inline-block";
  displayResults();
}

function displayResults() {
  let resultsHTML = "";
  quizData.forEach((question, index) => {
    const userAnswerIndex = userChoices[index];
    const correctAnswerIndex = question[5];
    const isCorrect = userAnswerIndex === correctAnswerIndex;
    resultsHTML += `<div class="answer ${
      isCorrect ? "correct-answer" : "incorrect-answer"
    }">
                      <p><strong>Question ${index + 1}:</strong> ${
      question[0]
    }</p>
                      <p>Your Answer: ${question[userAnswerIndex + 1]}</p>
                      <p>Correct Answer: ${question[correctAnswerIndex + 1]}</p>
                    </div>`;
  });
  allAnswersContainer.innerHTML = resultsHTML;
  scoreDisplayElement.textContent = `Your Score: ${score} / ${quizData.length}`;
}

function displayAnswersInModal() {
  let modalAnswersHTML = "";
  quizData.forEach((question, index) => {
    const userAnswerIndex = userChoices[index];
    const correctAnswerIndex = question[5];
    const isCorrect = userAnswerIndex === correctAnswerIndex;
    modalAnswersHTML += `<div class="answer ${
      isCorrect ? "correct-answer" : "incorrect-answer"
    }">
                          <p><strong>Question ${index + 1}:</strong> ${
      question[0]
    }</p>
                          <p>Your Answer: ${question[userAnswerIndex + 1]}</p>
                          <p>Correct Answer: ${
                            question[correctAnswerIndex + 1]
                          }</p>
                        </div>`;
  });
  modalAnswersElement.innerHTML = modalAnswersHTML;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  userChoices = [];
  score = 0;
  timerSeconds = 60;
  clearInterval(timerInterval);
  timerElement.textContent = timerSeconds;
  resultsContainer.style.display = "none";
  viewAnswersButton.style.display = "none";
  submitButton.style.display = "inline-block";
  restartButton.style.display = "inline-block";
  initializeQuiz();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timerSeconds--;
    timerElement.textContent = timerSeconds;
    if (timerSeconds === 0) {
      clearInterval(timerInterval);
      timerHintElement.textContent = "Time's up!";
      timerHintElement.style.color = "red";
      endQuiz();
    }
  }, 1000);
}

function playSound(soundType) {
  switch (soundType) {
    case "correct":
      correctSound.play();
      break;
    case "incorrect":
      incorrectSound.play();
      break;
    default:
      break;
  }
}
playSound();

initializeQuiz();

viewAnswersButton.addEventListener("click", function () {
  answersModal.style.display = "block";
  displayAnswersInModal();
});

closeBtn.addEventListener("click", function () {
  answersModal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === answersModal) {
    answersModal.style.display = "none";
  }
});

submitButton.addEventListener("click", endQuiz);
restartButton.addEventListener("click", restartQuiz);
choiceButton.addEventListener("click", handleChoice);

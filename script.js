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
const progressBar = document.getElementById("progress-bar"); // Progress bar element

const correctSound = document.getElementById("correct-sound");
const incorrectSound = document.getElementById("incorrect-sound");
const timeoutSound = document.getElementById("timeout-sound");

let currentQuestionIndex = 0;
let score = 0;
const quizTimeInSeconds = 60;
let timeLeft = quizTimeInSeconds;
let timerInterval;

function startQuiz() {
  resetQuiz();
  shuffleQuizData(); // Shuffle quiz data before starting
  showQuestion();
  startTimer();
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = quizTimeInSeconds;
  resultsContainer.style.display = "none";
  viewAnswersButton.style.display = "none";
  clearInterval(timerInterval);
  timerElement.textContent = timeLeft;
  progressBar.style.width = "0%"; // Reset progress bar width
}

function shuffleQuizData() {
  for (let i = quizData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quizData[i], quizData[j]] = [quizData[j], quizData[i]];
  }
}

function showQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionTextElement.textContent = currentQuestion[0];
  choicesContainerElement.innerHTML = "";
  for (let i = 1; i <= 4; i++) {
    const choice = document.createElement("button");
    choice.textContent = currentQuestion[i];
    choice.classList.add("choice");
    choice.addEventListener("click", handleAnswerClick);
    choicesContainerElement.appendChild(choice);
  }
}

function handleAnswerClick(event) {
  const selectedChoice = event.target;
  const correctIndex = quizData[currentQuestionIndex][5];
  const selectedIndex = Array.from(choicesContainerElement.children).indexOf(
    selectedChoice
  );

  // Disable other choices
  disableChoices();

  if (selectedIndex === correctIndex) {
    selectedChoice.style.backgroundColor = "#28a745"; // Green for correct answer
    score++;
    correctSound.play();
  } else {
    selectedChoice.style.backgroundColor = "#dc3545"; // Red for incorrect answer
    incorrectSound.play();

    // Highlight correct answer
    choicesContainerElement.children[correctIndex].style.backgroundColor =
      "#28a745";
  }

  if (currentQuestionIndex === quizData.length - 1) {
    setTimeout(endQuiz, 1000); // Delay showing results to allow visual feedback
  } else {
    currentQuestionIndex++;
    setTimeout(showQuestion, 1000); // Delay showing next question to allow visual feedback
  }
}

function disableChoices() {
  const choices = Array.from(choicesContainerElement.children);
  choices.forEach((choice) => {
    choice.disabled = true;
    if (
      choice.textContent !==
      quizData[currentQuestionIndex][quizData[currentQuestionIndex][5] + 1]
    ) {
      choice.style.backgroundColor = "#dc3545";
    }
  });
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    progressBar.style.width = `${
      ((quizTimeInSeconds - timeLeft) / quizTimeInSeconds) * 100
    }%`; // Update progress bar
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      timeoutSound.play();
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);
  resultsContainer.style.display = "block";
  scoreDisplayElement.textContent = `You scored ${score} out of ${quizData.length}`;
  if (currentQuestionIndex === quizData.length) {
    viewAnswersButton.style.display = "inline-block";
  }
}

function viewAnswers() {
  modalAnswersElement.innerHTML = "";
  quizData.forEach((question, index) => {
    const answerItem = document.createElement("p");
    const questionText = question[0];
    const correctAnswer = question[question[5] + 1];
    answerItem.textContent = `${index + 1}. ${questionText} - ${correctAnswer}`;
    modalAnswersElement.appendChild(answerItem);
  });
  answersModal.style.display = "block";
}

function closeModal() {
  answersModal.style.display = "none";
}

restartButton.addEventListener("click", startQuiz);
viewAnswersButton.addEventListener("click", viewAnswers);
document.querySelector(".close").addEventListener("click", closeModal);

startQuiz();

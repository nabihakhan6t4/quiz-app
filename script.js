let currentQuestion = 1;
const totalQuestions = 3; // Update this according to the total number of questions

function nextQuestion() {
  const currentQuestionElement = document.getElementById(`question${currentQuestion}`);
  const currentOptionsElement = document.getElementById(`options${currentQuestion}`);
  const nextQuestionElement = document.getElementById(`question${currentQuestion + 1}`);
  const nextOptionsElement = document.getElementById(`options${currentQuestion + 1}`);
  const resultElement = document.getElementById('result');
  const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);

  if (!selectedOption) {
    resultElement.innerText = "Please select an option.";
    return;
  }

  resultElement.innerText = '';

  currentQuestionElement.style.display = 'none';
  currentOptionsElement.style.display = 'none';

  if (currentQuestion < totalQuestions) {
    nextQuestionElement.style.display = 'block';
    nextOptionsElement.style.display = 'block';
    currentQuestion++;
  } else {
    resultElement.innerText = "Quiz completed!"; // Or any other action after the last question
  }
}

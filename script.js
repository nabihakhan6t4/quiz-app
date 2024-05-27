const questions = [
  {
    question : "What does the <meta> tag specify?",
    answers :[
      { text : "Metadata" , correct: true},
      { text : "Content" , correct: false},
      { text : "Structure" , correct: false},
      { text : "Styling" , correct: false},
    ]
  },
  {
    question : "What property creates space inside an element?",
    answers :[
      { text : "Margin" , correct: false},
      { text : "Content" , correct: false},
      { text : "padding" , correct: true},
      { text : "over-flow" , correct: false},
    ]
  },
  {
    question : "What is Bootstrap primarily used for?",
    answers :[
      { text : "Database management" , correct: false},
      { text : "Server-side scripting" , correct: false},
      { text : "Back-end development" , correct: false},
      { text : "Front-end" , correct: true},
    ]
  }
];
const questionElement = document.getElementById("question");
const answerbutton = document.getElementById("answer-buton");
const nextbutton = document.getElementById("next-btn");

let  currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextbutton.innerHTML = "next";
  showQuestion();
}

function startQuiz(){
   let currentQuestionIndex = questions[currentQuestionIndex];
   let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.
  question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendchild(button);
  });
}


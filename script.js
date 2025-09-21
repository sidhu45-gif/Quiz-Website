
// Quiz Questions
const questions = {
  easy: [
    { question: "What is 2 + 2?", answers: ["3", "4", "5"], correct: "4" },
    { question: "What color is the sky?", answers: ["Blue", "Green", "Red"], correct: "Blue" }
  ],
  medium: [
    { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter"], correct: "Mars" },
    { question: "Who wrote 'Romeo and Juliet'?", answers: ["Shakespeare", "Homer", "Dickens"], correct: "Shakespeare" }
  ],
  hard: [
    { question: "What is the derivative of x^2?", answers: ["x", "2x", "x^2"], correct: "2x" },
    { question: "Who proposed the theory of relativity?", answers: ["Newton", "Einstein", "Tesla"], correct: "Einstein" }
  ]
};

// Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const playerNameInput = document.getElementById("player-name");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const scoreText = document.getElementById("score-text");
const leaderboardList = document.getElementById("leaderboard");

let currentQuestionIndex = 0;
let currentQuestions = [];
let score = 0;
let leaderboard = [];

// Start Quiz
startBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim();
  if (!name) {
    alert("Please enter your name!");
    return;
  }
  const level = document.querySelector("input[name='level']:checked").value;
  currentQuestions = questions[level];
  currentQuestionIndex = 0;
  score = 0;
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();
});

// Show Question
function showQuestion() {
  resetState();
  let currentQuestion = currentQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer, currentQuestion.correct));
    answerButtons.appendChild(button);
  });
}

// Reset state
function resetState() {
  nextBtn.classList.add("hide");
  answerButtons.innerHTML = "";
}

// Select Answer
function selectAnswer(answer, correct) {
  if (answer === correct) {
    score++;
  }
  nextBtn.classList.remove("hide");
}

// Next Question
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

// Show Result
function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  scoreText.textContent = `You scored ${score} out of ${currentQuestions.length}!`;

  const playerName = playerNameInput.value.trim();
  leaderboard.push({ name: playerName, score: score });
  leaderboard.sort((a, b) => b.score - a.score);
  renderLeaderboard();
}

// Render Leaderboard
function renderLeaderboard() {
  leaderboardList.innerHTML = "";
  leaderboard.forEach(player => {
    const li = document.createElement("li");
    li.textContent = `${player.name}: ${player.score}`;
    leaderboardList.appendChild(li);
  });
}

// Restart Quiz
restartBtn.addEventListener("click", () => {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
});

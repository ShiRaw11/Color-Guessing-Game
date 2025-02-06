const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "cyan",
  "lime",
  "magenta",
  "teal",
];

let score = 0;
let timer = 10;
let timerInterval;

const colorCircle = document.getElementById("target-color");
const colorOptions = document.getElementById("color-options");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const gameOverPopup = document.getElementById("game-over-popup");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const cancelBtn = document.getElementById("cancelBtn");
const gameOverMessage = document.getElementById("game-over-message");
const wonMessage = document.getElementById("won-message");

document.getElementById("closeBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});

function startGame() {
  timer = 10;
  clearInterval(timerInterval);
  scoreDisplay.textContent = `Score: ${score}`;
  colorOptions.innerHTML = "";

  const selectedColors = shuffleArray([...colors]).slice(0, 6);

  targetColor =
    selectedColors[Math.floor(Math.random() * selectedColors.length)];
  colorCircle.style.backgroundColor = targetColor;

  setTimeout(() => {
    colorCircle.style.backgroundColor = "grey";
    generateColorOptions(selectedColors);
    startTimer();
  }, 2000);
}

function generateColorOptions(selectedColors) {
  selectedColors.forEach((color) => {
    const btn = document.createElement("button");
    btn.style.backgroundColor = color;
    btn.addEventListener("click", () => checkGuess(color));
    colorOptions.appendChild(btn);
  });
}

function checkGuess(selectedColor) {
  clearInterval(timerInterval);
  if (selectedColor === targetColor) {
    score++;
    wonMessage.textContent = "Yay! You won! 🥳";
    colorCircle.style.backgroundColor = targetColor;
    setTimeout(() => {
      gameOverPopup.style.display = "none";
      wonMessage.textContent = "";
      startGame();
    }, 1500);
  } else {
    gameOverMessage.textContent = "Oops! You chose the wrong color🙂.";
    gameOverPopup.style.display = "block";
  }
}

function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timer--;
  timerDisplay.textContent = `Time: ${timer}s`;
  if (timer <= 0) {
    clearInterval(timerInterval);
    gameOverMessage.textContent = "Time's up! You lost.";
    gameOverPopup.style.display = "block";
  }
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

tryAgainBtn.addEventListener("click", () => {
  gameOverPopup.style.display = "none";
  startGame();
});

cancelBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

startGame();

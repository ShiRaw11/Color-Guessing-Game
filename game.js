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
];
let score = 0;
let level = parseInt(localStorage.getItem("selectedLevel")) || 1;
let timer = 10;
let timerInterval;
let levelColors = 3 + (level - 1);

const colorCircle = document.getElementById("target-color");
const colorOptions = document.getElementById("color-options");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const nextLevelBtn = document.getElementById("nextLevelBtn");
const prevLevelBtn = document.getElementById("prevLevelBtn");
const gameOverPopup = document.getElementById("game-over-popup");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const cancelBtn = document.getElementById("cancelBtn");
const gameOverMessage = document.getElementById("game-over-message");
const wonMessage = document.getElementById("won-message");
const levelInfo = document.getElementById("level-info");

function startGame() {
  timer = 10;
  clearInterval(timerInterval); // Ensure no duplicate timers
  scoreDisplay.textContent = `Score: ${score}`;
  levelInfo.textContent = `Level: ${level}`;
  colorOptions.innerHTML = "";

  // Select a random target color
  targetColor = colors[Math.floor(Math.random() * levelColors)];
  colorCircle.style.backgroundColor = targetColor;

  setTimeout(() => {
    colorCircle.style.backgroundColor = "grey"; // Hide color after 2 sec
    generateColorOptions();
    startTimer(); // Start the timer after hoices are displayed
  }, 2000);

  // Hide/show navigation buttons
  prevLevelBtn.style.display = level === 1 ? "none" : "inline-block";
  nextLevelBtn.style.display = level === 5 ? "none" : "inline-block";
}

function generateColorOptions() {
  const shuffledColors = shuffleArray([...colors].slice(0, levelColors));
  shuffledColors.forEach((color) => {
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

// Navigation buttons
nextLevelBtn.addEventListener("click", () => {
  if (level < 5) {
    level++;
    levelColors = Math.min(3 + level, 10);
    localStorage.setItem("selectedLevel", level);
    startGame();
  }
});

prevLevelBtn.addEventListener("click", () => {
  if (level > 1) {
    level--;
    levelColors = Math.max(3, 3 + level - 1);
    localStorage.setItem("selectedLevel", level); // Save level
    startGame();
  }
});

tryAgainBtn.addEventListener("click", () => {
  gameOverPopup.style.display = "none";
  startGame();
});

cancelBtn.addEventListener("click", () => {
  window.location.href = "landing.html";
});

startGame();

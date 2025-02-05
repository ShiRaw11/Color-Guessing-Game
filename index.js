const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
let score = 0;
let targetColor = "";
const colorBox = document.getElementById("colorBox");
const colorOptions = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

function startGame() {
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = targetColor;
    colorOptions.innerHTML = "";
    colors.forEach(color => {
        const btn = document.createElement("button");
        btn.classList.add("colorOption");
        btn.style.backgroundColor = color;
        btn.setAttribute("data-testid", "colorOption");
        btn.addEventListener("click", () => checkGuess(color));
        colorOptions.appendChild(btn);
    });
    gameStatus.textContent = "";
}

function checkGuess(selectedColor) {
    if (selectedColor === targetColor) {
        gameStatus.textContent = "YAAAAY corrects guess 🥳💯";
        score++;
        scoreDisplay.textContent = score;
        setTimeout(startGame, 1500); 
    } else {
        gameStatus.textContent = "OOPS! Try again. 😐";
    }
}

newGameButton.addEventListener("click", () => {
    score = 0;
    scoreDisplay.textContent = score;
    startGame();
});

startGame();
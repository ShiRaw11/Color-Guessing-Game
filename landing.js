document.addEventListener("DOMContentLoaded", () => {
  const levelPopup = document.getElementById("levelPopup");
  const selectLevelBtn = document.getElementById("selectLevelBtn");
  const closePopup = document.getElementById("closePopup");
  const levelChoices = document.querySelectorAll(".level-choice");

  selectLevelBtn.addEventListener("click", () => {
    levelPopup.style.display = "block";
  });

  closePopup.addEventListener("click", () => {
    levelPopup.style.display = "none";
  });

  levelChoices.forEach((button) => {
    button.addEventListener("click", (event) => {
      const selectedLevel = event.target.getAttribute("data-level");
      localStorage.setItem("selectedLevel", selectedLevel);
      window.location.href = "game.html";
    });
  });
});

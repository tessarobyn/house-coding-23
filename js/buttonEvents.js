import { game } from "./gameScript.js";

const animateHomeContent = () => {
  const titleContainer = document.getElementById("titleContainer");
  titleContainer.classList.add("animateTitle");
  const buttonContainer = document.getElementById("buttonContainer");
  buttonContainer.classList.add("animateButton");
  const sunRaysCountContainer = document.getElementById(
    "sunRaysCountContainer"
  );
  sunRaysCountContainer.classList.add("animateSunRaysCount");
  game.setup();
};

const startGame = () => {
  animateHomeContent();
};

const playButton = document.getElementById("playButton");
playButton.addEventListener("click", startGame);

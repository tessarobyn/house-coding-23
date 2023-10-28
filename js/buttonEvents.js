import { demo } from "./demoScript.js";
import { game } from "./gameScript.js";

const animateHomeContent = () => {
  const titleContainer = document.getElementById("titleContainer");
  titleContainer.classList.add("animateTitle");
  const buttonContainer = document.getElementById("buttonContainer");
  buttonContainer.classList.add("animateButton");

  demo.setup();
};

const startGame = () => {
  animateHomeContent();
};

const playButton = document.getElementById("playButton");
playButton.addEventListener("click", startGame);

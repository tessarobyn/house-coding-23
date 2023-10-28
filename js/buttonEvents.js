import { demo } from "./demoScript.js";
import { game } from "./gameScript.js";

const animateHomeContent = () => {
  const titleContainer = document.getElementById("titleContainer");
  titleContainer.classList.add("animateTitle");
  const buttonContainer = document.getElementById("buttonContainer");
  buttonContainer.classList.add("animateButton");
};

const startDemo = () => {
  animateHomeContent();
  demo.setup();
};

const showScoreAndTimer = () => {
  const sunRaysCountContainer = document.getElementById(
    "sunRaysCountContainer"
  );
  sunRaysCountContainer.classList.add("animateSunRaysCount");
  const timerContainer = document.getElementById("timerContainer");
  timerContainer.classList.add("animateTimer");
};

const startGame = () => {
  animateHomeContent();
  demo.finished = true;
  showScoreAndTimer();
  game.setupForImmediatePlay();
};

const startGameAfterDemo = () => {
  demo.finished = true;
  showScoreAndTimer();
  game.setupAfterStart();
};

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startDemo);

const playButton = document.getElementById("playButton");
playButton.addEventListener("click", startGame);

const playAfterDemoButton = document.getElementById("playAfterDemoButton");
playAfterDemoButton.addEventListener("click", startGameAfterDemo);

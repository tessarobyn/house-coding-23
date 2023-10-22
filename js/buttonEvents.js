const toGamePage = () => {
  window.location.href = "game.html";
};

const playButton = document.getElementById("playButton");
playButton.addEventListener("click", toGamePage);

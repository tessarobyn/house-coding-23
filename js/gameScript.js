import { setCanvasSize } from "./utils.js";
import { Earth } from "./Earth.js";
import { Sun } from "./Sun.js";
import { GasRing } from "./GasRing.js";

class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ctx = this.canvas.getContext("2d");
    this._fillBackground();
    this._addEarth();
    this._addSun();
    this._addGasRing();
    this.start = false;
  }
  _fillBackground = () => {
    this.ctx.fillStyle = "rgb(31, 35, 51)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };
  _addEarth = () => {
    const smallest = this.width < this.height ? this.width : this.height;
    this.earth = new Earth(
      this.ctx,
      this.width * 0.7,
      this.height / 2,
      smallest / 5
    );
    this.earth.draw();
  };
  _addGasRing = () => {
    const smallest = this.width < this.height ? this.width : this.height;
    this.gasRing = new GasRing(
      this.ctx,
      this.width * 0.7,
      this.height / 2,
      smallest / 3
    );
    this.gasRing.draw();
  };
  update = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this._fillBackground();
    if (this.start) {
      this.sun.draw();
    }
    this.gasRing.draw();
    this.earth.draw();

    window.requestAnimationFrame(this.update.bind(this));
  };
  _moveEarthToStartingPosition = () => {
    this.earth.moveToX(this.width / 2);

    let setupEarthFrames;
    if (Math.round(this.earth.x) == this.width / 2) {
      cancelAnimationFrame(setupEarthFrames);
      this.start = true;
    } else {
      setupEarthFrames = window.requestAnimationFrame(
        this._moveEarthToStartingPosition.bind(this)
      );
    }
  };
  _moveRingToStartingPosition = () => {
    this.gasRing.moveToX(this.width / 2);

    let setupRingFrames;
    if (Math.round(this.gasRing.x) == this.width / 2) {
      cancelAnimationFrame(setupRingFrames);
      this.start = true;
    } else {
      setupRingFrames = window.requestAnimationFrame(
        this._moveRingToStartingPosition.bind(this)
      );
    }
  };
  _addSun = () => {
    const smallest = this.width < this.height ? this.width : this.height;
    this.sun = new Sun(
      this.ctx,
      this.width * 0.2,
      this.height * 0.2,
      smallest / 10
    );
  };
  setup = () => {
    this._moveEarthToStartingPosition();
    this._moveRingToStartingPosition();
  };
}

export const game = new Game();
// Starts animation loop - could move so it is when gameplay starts?
window.requestAnimationFrame(game.update.bind(game));
import { setCanvasSize } from "./utils.js";
import { Earth } from "./Earth.js";
import { Sun } from "./Sun.js";
import { GasRing } from "./GasRing.js";
import { SunRay } from "./SunRays.js";

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
    this._addSunRay();
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
      smallest / 2.75
    );
    this.gasRing.draw();
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
  _addSunRay = () => {
    const smallest = this.width < this.height ? this.width : this.height;
    this.sunRay = new SunRay(
      this.ctx,
      this.width * 0.2,
      this.height * 0.2,
      smallest / 10
    );
  };
  _moveEarthToStartingPosition = () => {
    this.earth.moveToX(this.width / 2, 2);

    let setupEarthFrames;
    if (Math.round(this.earth.x) <= this.width / 2) {
      cancelAnimationFrame(setupEarthFrames);
      this.start = true;
    } else {
      setupEarthFrames = window.requestAnimationFrame(
        this._moveEarthToStartingPosition.bind(this)
      );
    }
  };
  _moveRingToStartingPosition = () => {
    this.gasRing.moveToX(this.width / 2, 2);

    let setupRingFrames;
    if (Math.round(this.gasRing.x) <= this.width / 2) {
      cancelAnimationFrame(setupRingFrames);
      this.start = true;
    } else {
      setupRingFrames = window.requestAnimationFrame(
        this._moveRingToStartingPosition.bind(this)
      );
    }
  };
  setup = () => {
    this._moveEarthToStartingPosition();
    this._moveRingToStartingPosition();
  };
  update = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this._fillBackground();
    this.gasRing.draw();
    this.earth.draw();
    if (this.start) {
      this.sun.draw();
      //   if (this.sunRay.towardsPlanet) {
      //     this.sunRay.moveTowardsPlanet(
      //       this.earth.x,
      //       this.earth.y,
      //       this.earth.radius
      //     );
      //   }
      const angle = this.sunRay.calculateAngleBetweenTwoPoints(
        this.sun.x,
        this.sun.y,
        this.earth.x,
        this.earth.y
      );
      this.sunRay.setAngle(angle);
      this.sunRay.moveOnAngle();

      this.sunRay.draw();
    }

    window.requestAnimationFrame(this.update.bind(this));
  };
}

export const game = new Game();
// Starts animation loop - could move so it is when gameplay starts?
window.requestAnimationFrame(game.update.bind(game));

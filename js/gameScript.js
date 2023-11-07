import { mouseDown, setCanvasSize } from "./utils.js";
import { Earth } from "./Earth.js";
import { Sun } from "./Sun.js";
import { GasRing } from "./GasRing.js";
import { SunRay } from "./SunRays.js";
import { EarthAtmosphere } from "./EarthAtmosphere.js";

export class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ctx = this.canvas.getContext("2d");
    this.sunRays = [];
    this.start = false;
    this.addedSunRay = false;
    this.count = 0;
    this.rotation = 0;
    this.prevMousePos = [0, 0];
    this.rotating = false;

    this.interval = 1200;

    this.timer = document.getElementById("timer");
    this.pause = false;
  }

  rotate(event) {
    const mousePos = mouseDown(event, this.canvas);
    if (this.rotating) {
      const num = Math.abs(mousePos[0] - this.prevMousePos[0]) * 0.0025;
      if (this.prevMousePos[0] < mousePos[0]) {
        this.rotation -= num;
      } else {
        this.rotation += num;
      }
    }
    this.prevMousePos = mousePos;
  }

  _fillBackground = () => {
    this.ctx.fillStyle = "rgb(31, 35, 51)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  _addEarth = (xWidth) => {
    const smallest = this.width < this.height ? this.width : this.height;
    this.earth = new Earth(
      this.canvas,
      this.ctx,
      this.width * xWidth,
      this.height / 2,
      smallest / 5,
      smallest / 2.75
    );
    this.earth.draw();
  };

  _addAtmosphere = (xWidth) => {
    const smallest = this.width < this.height ? this.width : this.height;
    this.atmosphere = new EarthAtmosphere(
      this.canvas,
      this.ctx,
      this.width * xWidth,
      this.height / 2,

      smallest / 2.75
    );
    this.atmosphere.draw(this.count);
  };

  _addGasRing = (xWidth) => {
    const smallest = this.width < this.height ? this.width : this.height;
    const wallPairs = [
      [0, Math.PI * 0.3],
      [Math.PI * 0.35, Math.PI],
      [Math.PI * 1.1, Math.PI * 1.6],
      [Math.PI * 1.7, Math.PI * 1.8],
    ];
    this.gasRing = new GasRing(
      this.ctx,
      this.width * xWidth,
      this.height / 2,
      smallest / 2.75,
      wallPairs
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

  _addSunRays = () => {
    const smallest = this.width < this.height ? this.width : this.height;
    const sunRay = new SunRay(
      this.ctx,
      this.width * 0.2,
      this.height * 0.2,
      smallest / 10,
      this.sun.x,
      this.sun.y,
      this.earth.x,
      this.earth.y
    );
    this.sunRays.push(sunRay);
    if (this.interval > 900) {
      this.interval -= 20;
    } else if (this.interval > 700) {
      this.interval -= 10;
    } else if (this.interval > 500) {
      this.interval -= 5;
    }
    console.log(this.interval);
    if (!this.pause) {
      setTimeout(this._addSunRays.bind(this), this.interval);
    }
  };

  _updateTrappedRayCount = () => {
    const sunRaysCount = document.getElementById("sunRayCount");
    sunRaysCount.innerHTML = this.count;
    if (this.count >= 10) {
      this.pause = true;
    }
  };

  setupAfterStart = () => {
    this._setupMouseEvents();
    this._fillBackground();
    this._addAtmosphere(0.5);
    this._addEarth(0.5);
    this._addSun();
    this._addGasRing(0.5);
    this.start = true;
    window.requestAnimationFrame(this.update.bind(this));
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

  _moveAtmosphereToStartingPosition = () => {
    this.atmosphere.moveToX(this.width / 2, 2);

    let setupAtmosphereFrames;
    if (Math.round(this.earth.x) <= this.width / 2) {
      cancelAnimationFrame(setupAtmosphereFrames);
    } else {
      setupAtmosphereFrames = window.requestAnimationFrame(
        this._moveAtmosphereToStartingPosition.bind(this)
      );
    }
  };

  _moveRingToStartingPosition = () => {
    this.gasRing.moveToX(this.width / 2, 2);

    let setupRingFrames;
    if (Math.round(this.gasRing.x) <= this.width / 2) {
      cancelAnimationFrame(setupRingFrames);
    } else {
      setupRingFrames = window.requestAnimationFrame(
        this._moveRingToStartingPosition.bind(this)
      );
    }
  };

  setupForImmediatePlay = () => {
    this._setupMouseEvents();
    this._fillBackground();
    this._addAtmosphere(0.7);
    this._addEarth(0.7);
    this._addSun();
    this._addGasRing(0.7);
    this._moveAtmosphereToStartingPosition();
    this._moveEarthToStartingPosition();
    this._moveRingToStartingPosition();
    window.requestAnimationFrame(this.update.bind(this));
  };

  _showGameOverScreen = () => {
    const gameOverScreen = document.getElementById("gameOver");
    gameOverScreen.classList.add("showScreen");
    const gameOverMessage = document.getElementById("gameOverMessage");
    gameOverMessage.innerHTML = `Earth overheated in ${this.timer.innerHTML}`;
  };

  _getTimeValue = () => {
    const totalSeconds = Math.floor((Date.now() - this.startTime) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  _updateTimer = () => {
    this.timer.innerHTML = this._getTimeValue();
  };

  update = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this._fillBackground();
    this.atmosphere.draw(this.count);
    this.gasRing.draw(this.rotation);
    this.gasRing.increaseWalls();
    this.earth.draw(this.rotation);

    if (this.start) {
      if (this.startTime == undefined) {
        this.startTime = Date.now();
      }

      if (!this.addedSunRay) {
        this._addSunRays();
        this.addedSunRay = true;
      }

      let trappedRaysCount = 0;
      const removeIndexes = [];
      for (let i = 0; i < this.sunRays.length; i++) {
        this.sunRays[i].checkCollisionWithEarth(
          this.earth.x,
          this.earth.y,
          this.earth.radius
        );
        if (!this.sunRays[i].enteredAtmosphere) {
          this.sunRays[i].checkIfEnteredAtmosphere(
            this.gasRing.x,
            this.gasRing.y,
            this.gasRing.radius
          );
        }
        if (this.sunRays[i].enteredAtmosphere && !this.sunRays[i].escaped) {
          trappedRaysCount += 1;
        }
        if (this.sunRays[i].hadFirstCollision && !this.sunRays[i].escaped) {
          this.sunRays[i].checkCollisionWithRing(
            this.gasRing.x,
            this.gasRing.y,
            this.gasRing.radius,
            this.gasRing.wallPairs,
            this.rotation
          );
        }

        if (this.sunRays[i].escaped) {
          if (
            this.sunRays[i].x < 0 ||
            this.sunRays[i].x > this.canvas.width ||
            this.sunRays[i].y < 0 ||
            this.sunRays[i].y > this.canvas.height
          ) {
            removeIndexes.push(i);
          }
        }
        this.sunRays[i].moveOnAngle();
        this._updateTimer();

        this.sunRays[i].draw();
      }
      for (let i = 0; i < removeIndexes.length; i++) {
        this.sunRays.splice(removeIndexes[i], 1);
      }
      this.count = trappedRaysCount;

      this._updateTrappedRayCount();
    }
    this.sun.draw();

    if (!this.pause) {
      window.requestAnimationFrame(this.update.bind(this));
    } else {
      this._showGameOverScreen();
    }
  };

  _setupMouseEvents = () => {
    window.addEventListener("mousedown", () => {
      this.rotating = true;
    });

    window.addEventListener("mouseup", () => {
      this.rotating = false;
    });

    window.addEventListener("mousemove", (event) => {
      this.rotate(event);
    });
  };
}

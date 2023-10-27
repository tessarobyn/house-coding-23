import { mouseDown, setCanvasSize } from "./utils.js";
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
    this.sunRays = [];
    this._fillBackground();
    this._addEarth();
    this._addSun();
    this._addGasRing();
    this.start = false;
    this.addedSunRay = false;

    this.rotation = 0;
    this.prevMousePos = [0, 0];
    this.rotating = false;
  }

  rotate(event) {
    const mousePos = mouseDown(event, this.canvas);
    if (this.rotating) {
      console.log(this.rotating);

      const num = Math.abs(mousePos[0] - this.prevMousePos[0]) * 0.0025;
      if (this.prevMousePos[0] < mousePos[0]) {
        this.rotation -= num;
      } else {
        // console.log((mousePos[0] - this.prevMousePos[0]) * 0.005);
        this.rotation += num;
      }
    }
    this.prevMousePos = mousePos;
    console.log(this.rotation);
  }

  _fillBackground = () => {
    this.ctx.fillStyle = "rgb(31, 35, 51)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  _addEarth = () => {
    const smallest = this.width < this.height ? this.width : this.height;
    this.earth = new Earth(
      this.canvas,
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
    setTimeout(this._addSunRays.bind(this), 1500);
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
    this.gasRing.draw(this.rotation);
    this.earth.draw(this.rotation);
    if (this.start) {
      //   if (this.sunRay.towardsPlanet) {
      //     this.sunRay.moveTowardsPlanet(
      //       this.earth.x,
      //       this.earth.y,
      //       this.earth.radius
      //     );
      //   }
      if (!this.addedSunRay) {
        this._addSunRays();
        this.addedSunRay = true;
      }

      for (let i = 0; i < this.sunRays.length; i++) {
        this.sunRays[i].checkCollisionWithEarth(
          this.earth.x,
          this.earth.y,
          this.earth.radius
        );
        if (this.sunRays[i].hadFirstCollision && !this.sunRays[i].escaped) {
          this.sunRays[i].checkCollisionWithRing(
            this.gasRing.x,
            this.gasRing.y,
            this.gasRing.radius,
            this.gasRing.wallPairs,
            this.rotation
          );
        }

        this.sunRays[i].moveOnAngle();
        this.sunRays[i].draw();
      }
      this.sun.draw();
    }

    window.requestAnimationFrame(this.update.bind(this));
  };
}

export const game = new Game();
// Starts animation loop - could move so it is when gameplay starts?
window.requestAnimationFrame(game.update.bind(game));

window.addEventListener("mousedown", () => {
  game.rotating = true;
});

window.addEventListener("mouseup", () => {
  game.rotating = false;
});

window.addEventListener("mousemove", (event) => {
  game.rotate(event);
});

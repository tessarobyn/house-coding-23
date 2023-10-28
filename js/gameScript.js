import { mouseDown, setCanvasSize } from "./utils.js";
import { Earth } from "./Earth.js";
import { Sun } from "./Sun.js";
import { GasRing } from "./GasRing.js";
import { SunRay } from "./SunRays.js";
import { EarthAtmosphere } from "./EarthAtmosphere.js";

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
    this._addAtmosphere();
    this._addEarth();
    this._addSun();
    this._addGasRing();
    this.start = false;
    this.addedSunRay = false;
    this.count = 0;
    this.rotation = 0;
    this.prevMousePos = [0, 0];
    this.rotating = false;
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

  _addEarth = () => {
    const smallest = this.width < this.height ? this.width : this.height;
    this.earth = new Earth(
      this.canvas,
      this.ctx,
      this.width / 2,
      this.height / 2,
      smallest / 5,
      smallest / 2.75
    );
    this.earth.draw();
  };

  _addAtmosphere = () => {
    const smallest = this.width < this.height ? this.width : this.height;
    this.atmosphere = new EarthAtmosphere(
      this.canvas,
      this.ctx,
      this.width / 2,
      this.height / 2,

      smallest / 2.75
    );
    this.atmosphere.draw(this.count);
  };

  _addGasRing = () => {
    const smallest = this.width < this.height ? this.width : this.height;
    this.gasRing = new GasRing(
      this.ctx,
      this.width / 2,
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
    setTimeout(this._addSunRays.bind(this), 1000);
  };

  _updateTrappedRayCount = () => {
    const sunRaysCount = document.getElementById("sunRayCount");
    sunRaysCount.innerHTML = this.count;
  };

  update = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this._fillBackground();
    this.atmosphere.draw(this.count);
    this.gasRing.draw(this.rotation);
    this.earth.draw(this.rotation);

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
      this.sunRays[i].draw();
    }
    for (let i = 0; i < removeIndexes.length; i++) {
      this.sunRays.splice(removeIndexes[i], 1);
    }
    this.count = trappedRaysCount;

    this._updateTrappedRayCount();
    this.sun.draw();

    window.requestAnimationFrame(this.update.bind(this));
  };
}

export const game = new Game();

window.addEventListener("mousedown", () => {
  game.rotating = true;
});

window.addEventListener("mouseup", () => {
  game.rotating = false;
});

window.addEventListener("mousemove", (event) => {
  game.rotate(event);
});

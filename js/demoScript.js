import { Earth } from "./Earth.js";
import { Sun } from "./Sun.js";
import { GasRing } from "./GasRing.js";
import { SunRay } from "./SunRays.js";
import { EarthAtmosphere } from "./EarthAtmosphere.js";

class Demo {
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
    this.showGasRing = false;
    this.pause = false;
    this.start = false;
    this.addedSunRay = false;
    this.previousCard = 0;
    this.finished = false;
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
      this.width * 0.7,
      this.height / 2,

      smallest / 2.75
    );
    this.atmosphere.draw(this.count);
  };

  _addGasRing = () => {
    const smallest = this.width < this.height ? this.width : this.height;
    const wallPairs = [
      [0, Math.PI * 0.3],
      [Math.PI * 0.35, Math.PI * 0.5],
      [Math.PI * 0.6, Math.PI * 1.6],
      [Math.PI * 1.7, Math.PI * 1.8],
    ];
    this.gasRing = new GasRing(
      this.ctx,
      this.width * 0.7,
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

  _addSunRay = () => {
    const smallest = this.width < this.height ? this.width : this.height;
    this.sunRay = new SunRay(
      this.ctx,
      this.width * 0.2,
      this.height * 0.2,
      smallest / 10,
      this.sun.x,
      this.sun.y,
      this.earth.x,
      this.earth.y
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

  setup = () => {
    this._moveAtmosphereToStartingPosition();
    this._moveEarthToStartingPosition();
    this._moveRingToStartingPosition();
  };

  _showCard = (id) => {
    const card = document.getElementById(`card${id}`);
    card.style.top = `${this.sunRay.y + 10}px`;
    card.style.left = `${this.sunRay.x + 10}px`;
    card.style.visibility = "visible";
    card.addEventListener("click", () => {
      console.log(this.previousCard);
      this.pause = false;
      card.style.visibility = "hidden";
      this.previousCard = id;
    });
  };

  _showLastCard = () => {
    const card = document.getElementById("card6");
    card.style.visibility = "visible";
    card.addEventListener("click", () => {
      console.log(this.previousCard);
      this.pause = false;
      card.style.visibility = "hidden";
      this.previousCard = 6;
    });
  };

  update = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this._fillBackground();
    this.atmosphere.draw(this.count);
    if (this.showGasRing) {
      this.gasRing.draw(0);
    }
    this.earth.draw(0);

    if (this.start) {
      if (!this.addedSunRay) {
        this._addSunRay();
        this.addedSunRay = true;
      } else {
        this.sunRay.checkCollisionWithEarth(
          this.earth.x,
          this.earth.y,
          this.earth.radius
        );
        if (!this.sunRay.enteredAtmosphere) {
          this.sunRay.checkIfEnteredAtmosphere(
            this.gasRing.x,
            this.gasRing.y,
            this.gasRing.radius
          );
        }
        if (
          this.sunRay.enteredAtmosphere &&
          !this.sunRay.escaped &&
          this.previousCard == 0
        ) {
          this.pause = true;
          this._showCard(1);
        }
        if (this.sunRay.hadFirstCollision && !this.sunRay.escaped) {
          this.sunRay.checkCollisionWithRing(
            this.gasRing.x,
            this.gasRing.y,
            this.gasRing.radius,
            this.gasRing.wallPairs,
            0
          );
          if (this.previousCard == 1) {
            this.pause = true;
            this._showCard(2);
          } else if (this.previousCard == 2) {
            const distanceToRingCentre =
              ((this.sunRay.x - this.gasRing.x) ** 2 +
                (this.sunRay.y - this.gasRing.y) ** 2) **
              (1 / 2);
            if (
              distanceToRingCentre + this.sunRay.radius >=
              this.gasRing.radius
            ) {
              this.pause = true;
              this._showCard(3);
            }
          } else if (this.previousCard == 3) {
            this.pause = true;
            this.showGasRing = true;
            this._showCard(4);
          } else if (this.previousCard == 4) {
            this.pause = true;
            this._showCard(5);
          } else if (this.previousCard == 5) {
            this._showLastCard();
          }
        }
        if (!this.pause) {
          this.sunRay.moveOnAngle();
        }

        this.sunRay.draw();
      }

      this.sun.draw();
    }
    if (this.previousCard != 6 && !this.finished) {
      window.requestAnimationFrame(this.update.bind(this));
    }
  };
}

export const demo = new Demo();
window.requestAnimationFrame(demo.update.bind(demo));

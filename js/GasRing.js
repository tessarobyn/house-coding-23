import { randFloat, randInt } from "./utils.js";

export class GasRing {
  constructor(ctx, x, y, radius, wallPairs) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.wallPairs = this._generateWalls();
    // this.wallPairs = [
    //   [0, Math.PI * 0.3],
    //   [Math.PI * 0.35, Math.PI],
    //   [Math.PI * 1.1, Math.PI * 1.6],
    //   [Math.PI * 1.7, Math.PI * 1.8],
    // ];
    // this._generateWalls();
  }

  _generateWalls() {
    const walls = [];
    for (let i = 0; i < randInt(20, 25); i++) {
      const start = randFloat(0, 2);
      const gapLength = randFloat(0.1, 0.15);
      let end = start + gapLength;
      if (end > 2) {
        end -= 2;
      }
      walls.push([start * Math.PI, end * Math.PI]);
    }
    return walls;
  }

  increaseWalls() {
    for (let i = 0; i < this.wallPairs.length; i++) {
      this.wallPairs[i][0] -= (2 * Math.PI) / 100000;
    }
  }
  // _generateWalls() {
  //   const smallestGap = 0.05;
  //   const biggestGap = 0.2;
  //   const smallestWall = 0.05;
  //   const biggestWall = 0.5;
  //   let total = 0;
  //   const start = randFloat(0, 2);
  //   let currentStartWall = 0;
  //   while (total < 2) {
  //     let wallLength = randFloat(smallestWall, biggestWall);
  //     // if (total + wallLength > 2) {
  //     //   wallLength = 2 - total - randFloat(smallestGap, biggestGap);
  //     // }
  //     const wall = [Math.PI * currentStartWall, Math.PI * wallLength];
  //     this.wallPairs.push(wall);
  //     console.log(wallLength);
  //     total += wallLength;
  //     let gapLength = randFloat(smallestGap, biggestGap);
  //     total += gapLength;
  //     currentStartWall = total + gapLength;
  //   }
  // }
  draw(rotation) {
    for (let i = 0; i < this.wallPairs.length; i++) {
      this.ctx.setTransform(1, 0, 0, 1, this.x, this.y);
      this.ctx.rotate(Math.PI * rotation);
      const gasRing = new Path2D();
      gasRing.arc(
        0,
        0,
        this.radius,
        this.wallPairs[i][0],
        this.wallPairs[i][1]
      );
      this.ctx.strokeStyle = "rgb(175, 175, 175)";
      this.ctx.lineWidth = 5;
      this.ctx.stroke(gasRing);
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  }
  moveToX(dest, speed) {
    if (dest > this.x) {
      this.x += speed;
    } else if (dest < this.x) {
      this.x -= speed;
    }
  }
}

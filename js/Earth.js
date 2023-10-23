import { mouseDown } from "./utils.js";

export class Earth {
  constructor(canvas, ctx, x, y, radius) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.rotation = 0;
    this.prevMousePos = [0, 0];
    this.rotating = false;
  }
  rotate(event) {
    if (this.rotating) {
      console.log(this.rotating);
      const mousePos = mouseDown(event, this.canvas);
      const num = Math.abs(mousePos[0] - this.prevMousePos[0]) * 0.0025;
      if (this.prevMousePos[0] < mousePos[0]) {
        this.rotation -= num;
      } else {
        // console.log((mousePos[0] - this.prevMousePos[0]) * 0.005);
        this.rotation += num;
      }
      this.prevMousePos = mousePos;
    }
  }

  draw() {
    this.ctx.setTransform(1, 0, 0, 1, this.x, this.y);
    this.ctx.rotate(Math.PI * this.rotation);
    this.tx = this.x;
    this.ty = this.y;
    this.y = 0;
    this.x = 0;

    const earth = new Path2D();
    earth.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.gradient = this.ctx.createLinearGradient(
      this.x - this.radius * 1.5,
      this.y - this.radius * 1.5,
      this.x + this.radius * 1.5,
      this.y + this.radius * 1.5
    );
    this.gradient.addColorStop(0, "blue");
    this.gradient.addColorStop(0.5, "cyan");
    this.gradient.addColorStop(1, "blue");
    this.ctx.fillStyle = this.gradient;
    this.ctx.fill(earth);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.y = this.ty;
    this.x = this.tx;
  }
  moveToX(dest, speed) {
    if (dest > this.x) {
      this.x += speed;
    } else if (dest < this.x) {
      this.x -= speed;
    }
  }
}

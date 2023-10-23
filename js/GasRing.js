export class GasRing {
  constructor(ctx, x, y, radius) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  draw() {
    const gasRing = new Path2D();
    gasRing.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.strokeStyle = "rgb(255,255,255)";
    this.ctx.stroke(gasRing);
  }
  moveToX(dest, speed) {
    if (dest > this.x) {
      this.x += speed;
    } else if (dest < this.x) {
      this.x -= speed;
    }
  }
}

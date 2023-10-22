export class Earth {
  constructor(ctx, x, y, radius) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  draw() {
    const earth = new Path2D();
    earth.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(8, 98, 255)";
    this.ctx.fill(earth);
  }
  moveToX(dest) {
    if (dest > this.x) {
      this.x += 1;
    } else if (dest < this.x) {
      this.x -= 1;
    }
  }
}

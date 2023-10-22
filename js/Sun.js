export class Sun {
  constructor(ctx, x, y, radius) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  draw() {
    const sun = new Path2D();
    sun.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(255, 247, 8)";
    this.ctx.fill(sun);
  }
}

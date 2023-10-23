export class Earth {
  constructor(ctx, x, y, radius) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.gradient = this.ctx.createLinearGradient(
      this.x - this.radius * 1.5,
      this.y - this.radius * 1.5,
      this.x + this.radius * 1.5,
      this.y + this.radius * 1.5
    );
    this.gradient.addColorStop(0, "blue");
    this.gradient.addColorStop(0.5, "cyan");
    this.gradient.addColorStop(1, "blue");
  }
  draw() {
    const earth = new Path2D();
    earth.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.gradient;
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

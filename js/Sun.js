export class Sun {
  constructor(ctx, x, y, radius) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sun = new Image();
    this.sun.src = "img/Sun.PNG";
  }
  draw() {
    this.ctx.drawImage(
      this.sun,
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }
}

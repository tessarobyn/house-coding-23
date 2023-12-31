export class Earth {
  constructor(canvas, ctx, x, y, radius) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.earth = new Image();
    this.earth.src = "img/Earth.PNG";
  }

  draw(rotation) {
    this.ctx.setTransform(1, 0, 0, 1, this.x, this.y);
    this.ctx.rotate(Math.PI * rotation);
    this.tx = this.x;
    this.ty = this.y;
    this.y = 0;
    this.x = 0;
    this.ctx.drawImage(
      this.earth,
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );

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

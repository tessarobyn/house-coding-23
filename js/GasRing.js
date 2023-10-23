export class GasRing {
  constructor(ctx, x, y, radius) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.rings = [
      [0, Math.PI * 0.25],
      [Math.PI / 3, Math.PI],
      [Math.PI * 1.1, Math.PI * 1.5],
      [Math.PI * 1.7, Math.PI * 1.8],
    ];
  }
  draw() {
    for (let i = 0; i < this.rings.length; i++) {
      const gasRing = new Path2D();
      gasRing.arc(
        this.x,
        this.y,
        this.radius,
        this.rings[i][0],
        this.rings[i][1]
      );
      this.ctx.strokeStyle = "rgb(255,255,255)";
      this.ctx.stroke(gasRing);
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

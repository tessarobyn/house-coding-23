export class GasRing {
  constructor(ctx, x, y, radius) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.wallPairs = [[0, Math.PI * 1.75]];
    // this.wallPairs = [
    //   [0, Math.PI * 0.25],
    //   [Math.PI / 3, Math.PI],
    //   [Math.PI * 1.1, Math.PI * 1.5],
    //   [Math.PI * 1.7, Math.PI * 1.8],
    // ];
  }
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
      this.ctx.strokeStyle = "rgb(255,255,255)";
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

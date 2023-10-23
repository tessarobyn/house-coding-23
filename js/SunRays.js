export class SunRay {
  constructor(ctx, x, y, sunRadius) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = sunRadius / 10;
    this.magic = 100;
    this.originX = x;
    this.originY = y;
    this.angle = 0;
    this.towardsPlanet = true;
  }
  moveX() {
    this.x += 1;
  }
  moveTowardsPlanet(destX, destY, objRad) {
    const diffX = destX - this.originX;
    const diffY = destY - this.originY;
    let distanceFromCentreToSurface = (diffX ** 2 + diffY ** 2) ** (1 / 2);
    distanceFromCentreToSurface -= objRad;
    const distanceTravelled =
      ((this.x - this.originX) ** 2 + (this.y - this.originY) ** 2) ** (1 / 2) +
      this.radius;
    if (distanceTravelled >= distanceFromCentreToSurface) {
      console.log("hit earth");
      this.towardsPlanet = false;
    } else {
      this.y += diffY / this.magic;
      this.x += diffX / this.magic;
    }
  }
  draw() {
    const sunRay = new Path2D();
    sunRay.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(255, 247, 8)";
    this.ctx.fill(sunRay);
  }
}

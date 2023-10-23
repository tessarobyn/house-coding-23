export class SunRay {
  constructor(ctx, x, y, sunRadius, sunX, sunY, earthX, earthY) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = sunRadius / 10;
    this.magic = 2;
    this.originX = x;
    this.originY = y;
    this.angle = this.calculateAngleBetweenTwoPoints(
      sunX,
      sunY,
      earthX,
      earthY
    );
    this.movingTowardsEarth = true;
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
  calculateAngleBetweenTwoPoints(x1, y1, x2, y2) {
    // Calculates angle from north direction (a bearing in radians)
    const theta = Math.atan(Math.abs(x1 - x2) / Math.abs(y1 - y2));
    if (x1 < x2 && y1 > y2) {
      return theta;
    } else if (x1 < x2 && y1 < y2) {
      return Math.PI - theta;
    } else if (x1 > x2 && y1 < y2) {
      return Math.PI + theta;
    } else if (x1 > x2 && y1 > y2) {
      return Math.PI * 2 - theta;
    }

    // Edge cases
    if (x1 == x2 && y1 > y2) {
      return 0;
    } else if (y1 == y2 && x1 < x2) {
      return Math.PI * 0.5;
    } else if (x1 == x2 && y1 < y2) {
      return Math.PI;
    } else if (y1 == y2 && x1 > x2) {
      return Math.PI * 1.5;
    }
    console.log("ERROR!");
  }
  setAngle(angle) {
    this.angle = angle;
  }
  setRandomAngle() {
    return Math.floor(Math.random() * (Math.PI * 2 + 1));
  }
  checkCollisionWithEarth(earthX, earthY, earthRadius) {
    const distanceToEarthCentre =
      ((this.x - earthX) ** 2 + (this.y - earthY) ** 2) ** (1 / 2);
    if (distanceToEarthCentre - this.radius <= earthRadius) {
      this.angle = this.setRandomAngle();
      this.movingTowardsEarth = false;
    }
  }
  moveOnAngle() {
    this.x += this.magic * Math.sin(this.angle);
    this.y -= this.magic * Math.cos(this.angle);
  }
  draw() {
    const sunRay = new Path2D();
    sunRay.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(255, 247, 8)";
    this.ctx.fill(sunRay);
  }
}

export class SunRay {
  constructor(ctx, x, y, sunRadius, sunX, sunY, earthX, earthY) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = sunRadius / 10;
    this.speed = 3;
    this.originX = x;
    this.originY = y;
    this.angle = this.calculateAngleBetweenTwoPoints(
      sunX,
      sunY,
      earthX,
      earthY
    );
    this.hadFirstCollision = false;
    this.escaped = false;
    this.enteredAtmosphere = false;
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
      this.towardsPlanet = false;
    } else {
      this.y += diffY / this.speed;
      this.x += diffX / this.speed;
    }
  }
  checkIfEnteredAtmosphere(ringX, ringY, ringRadius) {
    const distanceToRingCentre =
      ((this.x - ringX) ** 2 + (this.y - ringY) ** 2) ** (1 / 2);
    if (distanceToRingCentre + this.radius <= ringRadius) {
      this.enteredAtmosphere = true;
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
  setRandomAngle(radiusAngle) {
    let newAngle = radiusAngle;
    // if (radiusAngle <= Math.PI) {
    //   newAngle = radiusAngle + Math.PI;
    // } else {
    //   newAngle = radiusAngle - Math.PI;
    // }
    const randomAngle = Math.random() * (Math.PI / 2);
    if (Math.random() > 0.5 && newAngle <= Math.PI * 2 - randomAngle) {
      newAngle += randomAngle;
    } else {
      newAngle -= randomAngle;
    }
    return newAngle;
  }

  correctWallAngle(angle) {
    angle += Math.PI / 2;
    if (angle > Math.PI * 2) {
      angle = angle - Math.PI * 2;
    }
    return angle;
  }

  addRotationToAngle(rotation, angle) {
    angle += Math.PI * rotation;
    while (angle > Math.PI * 2) {
      angle -= Math.PI * 2;
    }
    while (angle < 0) {
      angle += Math.PI * 2;
    }
    return angle;
  }
  checkCollisionWithRing(ringX, ringY, ringRadius, ringWallPairs, rotation) {
    const distanceToRingCentre =
      ((this.x - ringX) ** 2 + (this.y - ringY) ** 2) ** (1 / 2);
    if (distanceToRingCentre + this.radius >= ringRadius) {
      const radiusAngle = this.calculateAngleBetweenTwoPoints(
        ringX,
        ringY,
        this.x,
        this.y
      );
      let hitWall = false;
      for (let i = 0; i < ringWallPairs.length; i++) {
        const startOfWallAngle = this.addRotationToAngle(
          rotation,
          this.correctWallAngle(ringWallPairs[i][0])
        );
        const endOfWallAngle = this.addRotationToAngle(
          rotation,
          this.correctWallAngle(ringWallPairs[i][1])
        );
        if (startOfWallAngle > endOfWallAngle) {
          if (
            (startOfWallAngle <= radiusAngle && radiusAngle <= Math.PI * 2) ||
            (0 <= radiusAngle && radiusAngle <= endOfWallAngle)
          ) {
            hitWall = true;
          }
        } else {
          if (
            startOfWallAngle <= radiusAngle &&
            radiusAngle <= endOfWallAngle
          ) {
            hitWall = true;
          }
        }
      }

      //   hitWall = !hitWall;
      if (hitWall) {
        this.angle = this.setRandomAngle(radiusAngle) + Math.PI;
      } else {
        this.escaped = true;
      }
    }
  }
  checkCollisionWithEarth(earthX, earthY, earthRadius) {
    const distanceToEarthCentre =
      ((this.x - earthX) ** 2 + (this.y - earthY) ** 2) ** (1 / 2);
    if (distanceToEarthCentre - this.radius <= earthRadius) {
      const radiusAngle = this.calculateAngleBetweenTwoPoints(
        earthX,
        earthY,
        this.x,
        this.y
      );
      this.angle = this.setRandomAngle(radiusAngle);
      this.hadFirstCollision = true;
    }
  }
  moveOnAngle() {
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);
  }
  draw() {
    const sunRay = new Path2D();
    sunRay.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(255, 247, 8)";
    this.ctx.fill(sunRay);
  }
}

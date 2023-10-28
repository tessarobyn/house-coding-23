import { Earth } from "./Earth.js";

export class EarthAtmosphere extends Earth {
  constructor(canvas, ctx, x, y, radius) {
    super(canvas, ctx, x, y, radius);
  }
  draw(count) {
    this.atmosphere = new Path2D();
    this.atmosphere.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(35, 42, 71)";
    this.ctx.fill(this.atmosphere);

    this.atmosphereOverlay = new Path2D();
    this.atmosphereOverlay.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = `rgba(255,0,0,${count / 50})`;
    this.ctx.fill(this.atmosphereOverlay);
  }
}

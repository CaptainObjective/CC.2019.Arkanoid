import { ctx, cw, ch } from './main';

class Ball {
  constructor(x, height) {
    this.size = 10;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.x = x;
    this.y = ch - height - this.size;
    this.speedMultiply = 1; //potrzebne do powerupa przyspieszającego i zwalniającego
  }

  move() {
    this.x += this.xSpeed * this.speedMultiply;
    this.y += this.ySpeed * this.speedMultiply;
  }
  draw() {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  onHit() {
    //Check if hit sth
  }
}
export default Ball;

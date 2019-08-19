import { ctx, cw, ch } from './main';

class Ball {
  constructor(x, height) {
    this.size = 10;
    this.xSpeed = 0;
    this.ySpeed = -5;
    this.x = x;
    this.y = ch - height - this.size;
    this.speedMultiply = 1; //potrzebne do powerupa przyspieszającego i zwalniającego
  }

  move() {
    if (this.isStopped) return;
    this.x += this.xSpeed * this.speedMultiply;
    this.y += this.ySpeed * this.speedMultiply;
  }
  draw() {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  onHit(paddle) {
    if (this.isStopped) return;
    //Check if hit walls
    const hitTop = this.y - this.size <= 0;
    const hitLeft = this.x - this.size <= 0;
    const hitRight = this.x + this.size >= cw;
    //Check if touched paddle
    const hitPaddle =
      this.y + this.size >= paddle.position.y &&
      this.x + this.size >= paddle.position.x &&
      this.x - this.size <= paddle.position.x + paddle.length;
    if (hitPaddle) {
      const seed = this.xSpeed > 0 ? Math.random() : -Math.random();
      const fromCenter = Math.abs(this.x - paddle.position.x + paddle.length / 2 - 100);
      const punishment = scale(fromCenter, 0, 50, 0, 2);

      this.ySpeed *= -1;

      this.xSpeed += seed * punishment;
      this.xSpeed *= punishment;
    } else if (hitTop) {
      this.ySpeed *= -1;
    } else if (hitLeft || hitRight) {
      this.xSpeed *= -1;
    }
    function scale(num, in_min, in_max, out_min, out_max) {
      return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    }
  }
  outOfCanvas() {
    return this.y - this.size > ch;
  }
}
export default Ball;

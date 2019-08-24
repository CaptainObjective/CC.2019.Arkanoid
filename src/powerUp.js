import { ctx, cw, ch } from './main';

class PowerUp {
  constructor(x, y) {
    this.ySpeed = 3;
    this.x = x;
    this.y = ch - y;
    this.protect = false;
    this.addBall = false;
    this.addLife = false;
  }
  fall() {
    this.y += this.ySpeed;
  }
  work() {}
  workWithBall() {}
  workWithPaddle() {}
  hitPaddle(ball, paddle) { 
    if (this.y - (ch-paddle.height-paddle.spaceFromBorder) > 0 && this.x >= paddle.position.x && this.x <= paddle.position.x + paddle.length) {
      this.work();
      this.workWithBall(ball);
      this.workWithPaddle(paddle);
      return true;
    }
  }
}
export default PowerUp;

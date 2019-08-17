import { ctx, cw, ch } from './main';

class PowerUp {
  constructor(x, y) {
    this.ySpeed = 3;
    this.x = x;
    this.y = ch - y;
  }
  fall() {
    this.y += this.ySpeed;
  }
  hitPaddle(ball, paddle, powerup) {
    if (powerup.y === ch - paddle.height && powerup.x >= paddle.x && powerup.x <= paddle.x + paddle.length) {
      powerup.work(ball);
      //znika z ekranu
      powerup.x = -100;
      // powerup.__proto__ = null;
      // powerup = null;
      // delete powerup;
      //te 3 linijki wyżej znalazłem w internecie, ale nie działają :(
    }
  }
}
export default PowerUp;

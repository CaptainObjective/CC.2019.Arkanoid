import { ctx, cw, ch } from './main';

class Paddle {
  constructor(x) {
    this.x = x;
    this.length = 100;
    this.height = 10;
    this.spaceFromBorder = 10;
    this.color = 'yellow';
    this.speed = 20;
    this.position = {
      x: (cw - this.length) / 2,
      y: ch - this.height - this.spaceFromBorder,
    };
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.length, this.height);
  }
  move(dir) {
    if (dir == 'LEFT') {
      if (this.position.x > 0) {
        this.position.x -= this.speed;
      }
    } else if (dir == 'RIGHT') {
      if (this.position.x < cw - this.length) {
        this.position.x += this.speed;
      }
    }
  }
}

export default Paddle;

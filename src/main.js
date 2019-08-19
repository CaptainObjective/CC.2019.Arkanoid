import Paddle from './paddle';
import Ball from './ball';
import Brick from './brick';
import enLargeBall from './powerUPs/enLargeBall';
// import shrinkBall from './powerUPs/shrinkBall';

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
export const cw = canvas.width;
export const ch = canvas.height;

const paddle = new Paddle();
const ball = new Ball(paddle.position.x + paddle.length / 2, paddle.height + paddle.spaceFromBorder);

const powerups = [];
// const LargeBall = new enLargeBall(-100, -100);
// const SmallBall = new shrinkBall(-100, -100);

const bricks = [];
for (let i = 0; i <= 3; i++) {
  for (let j = 0; j <= 8; j++) {
    const brick = new Brick(30 + j * 60, 270 - i * 40);
    bricks.push(brick);
  }
}
const gameLoop = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, cw, ch); //tło
  if (ball.isStopped) {
    ball.x = paddle.position.x + paddle.length / 2;
  }
  ball.move();
  ball.onHit(paddle);

  paddle.move();

  for (let i = 0; i < bricks.length; i++) {
    bricks[i].draw();
  }

  paddle.draw();
  ball.draw();

  if (powerups.length > 0) {
    for (let powerup of powerups) {
      powerup.draw();
      powerup.fall();
      powerup.hitPaddle(ball, paddle, powerup);
    }
  }

  //Game end check
  if (ball.outOfCanvas()) {
    alert('Koniec gry, odśwież by zagrać jeszcze raz');
  } else {
    requestAnimationFrame(gameLoop);
  }
};

document.addEventListener('click', e => {
  ball.isStopped = false;
});

document.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 37:
    case 65:
      paddle.setDir('LEFT');
      break;
    case 39:
    case 68:
      paddle.setDir('RIGHT');
      break;
  }
});

document.addEventListener('keyup', ({ keyCode }) => {
  switch (keyCode) {
    case 37:
    case 65:
    case 39:
    case 68:
      paddle.setDir(null);
      break;
  }
});

requestAnimationFrame(gameLoop);

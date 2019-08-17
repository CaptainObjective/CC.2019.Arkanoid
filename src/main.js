import Paddle from './paddle';
import Ball from './ball';
import enLargeBall from './powerUPs/enLargeBall'
import shrinkBall from './powerUPs/shrinkBall';

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
export const cw = canvas.width;
export const ch = canvas.height;

const paddle = new Paddle(cw / 2);
const ball = new Ball(paddle.x + paddle.length / 2, paddle.height);
const LargeBall = new enLargeBall(-100, -100);
const SmallBall = new shrinkBall(-100, -100);

const gameLoop = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, cw, ch); //tło
  ball.move(0, 0);
  ball.onHit();
  paddle.draw();
  ball.draw();

  LargeBall.draw();
  LargeBall.fall();
  LargeBall.hitPaddle(ball, paddle, LargeBall);

  SmallBall.draw();
  SmallBall.fall();
  SmallBall.hitPaddle(ball, paddle, SmallBall);

  requestAnimationFrame(gameLoop);
};

document.addEventListener('click', e => {
  console.log(e);
  ball.ySpeed = -5;
  ball.move();
});
document.addEventListener('keydown', e => {
  console.log(e);
  //powrot powerupa na ekran
  LargeBall.x = cw / 2 + 10;
  LargeBall.y = ch / 2
});
document.addEventListener('keyup', e => {
  console.log(e);
  //powrot powerupa na ekran
  SmallBall.x = cw / 2 + 10;
  SmallBall.y = ch / 2
});

requestAnimationFrame(gameLoop);

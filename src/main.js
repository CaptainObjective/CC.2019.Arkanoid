import Paddle from './paddle';
import Ball from './ball';
import Brick from './brick';

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
export const cw = canvas.width;
export const ch = canvas.height;

const paddle = new Paddle(cw / 2);
const ball = new Ball(paddle.x + paddle.length / 2, paddle.height);
const bricks=[];
for( let i = 0; i<=3;i++){
for(let j = 0; j<=8;j++){
  const brick = new Brick(30+j*60,270-i*40);
  bricks.push(brick);
}
}
const gameLoop = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, cw, ch); //tło
  ball.move(0, 0);
  ball.onHit();
  for(let i = 0; i<bricks.length;i++){
  bricks[i].draw();
  }
  paddle.draw();
  ball.draw();
  requestAnimationFrame(gameLoop);
};

document.addEventListener('click', e => {
  console.log(e);
  ball.ySpeed = -5;
  ball.move();
});

requestAnimationFrame(gameLoop);

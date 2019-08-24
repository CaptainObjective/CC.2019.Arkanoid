import Paddle from './paddle';
import Ball from './ball';
import Brick from './brick';
import enLargeBall from './powerUPs/enLargeBall';
import shrinkBall from './powerUPs/shrinkBall';
import enLargePaddle from './powerUPs/enLargePaddle';
import shrinkPaddle from './powerUPs/shrinkPaddle';
import speedUpBall from './powerUPs/speedUpBall';
import speedDownBall from './powerUPs/speedDownBall';
import rescueChain from './powerUPs/rescueChain';
import rescueChainObj from './powerUPs/rescueChainObj';
import speedUpPaddle from './powerUPs/speedUpPaddle';
import speedDownPaddle from './powerUPs/speedDownPaddle';
import addBall from './powerUPs/addBall';
import addLife from './powerUPs/extraLife';

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
export const cw = canvas.width;
export const ch = canvas.height;

const paddle = new Paddle();
const balls = [new Ball(paddle.position.x + paddle.length / 2, paddle.height + paddle.spaceFromBorder)];
const bricks = [];
const powerups = [];
let lives = 3;
let chain;
for (let i = 0; i <= 3; i++) {
  for (let j = 0; j <= 8; j++) {
    const brick = new Brick(10 + j * 65, 270 - i * 40);
    bricks.push(brick);
  }
}
balls[0].isStopped = true;

function collision() {
  function getPowerUp(x, y) {
    let num = Math.random() * 11;
    if (num > 0 && num < 1) {
      powerups.push(new enLargeBall(x, y));
    } else if (num >= 1 && num < 2) {
      powerups.push(new shrinkBall(x, y));
    } else if (num >= 2 && num < 3) {
      powerups.push(new enLargePaddle(x, y));
    } else if (num >= 3 && num < 4) {
      powerups.push(new shrinkPaddle(x, y));
    } else if (num >= 4 && num < 5) {
      powerups.push(new speedUpBall(x, y));
    } else if (num >= 5 && num < 6) {
      powerups.push(new speedDownBall(x, y));
    } else if (num >= 6 && num < 7) {
      powerups.push(new rescueChain(x, y));
    } else if (num >= 7 && num < 8) {
      powerups.push(new speedUpPaddle(x, y));
    } else if (num >= 8 && num < 9) {
      powerups.push(new speedDownPaddle(x, y));
    } else if (num >= 9 && num < 10) {
      powerups.push(new addBall(x, y));
    } else if (num >= 10 && num < 11) {
      powerups.push(new addLife(x, y));
    }
  }
  for (let ball of balls) {
    let ballL = ball.x - ball.size;
    let ballB = ball.y - ball.size;
    let ballR = ball.x + ball.size;
    let ballT = ball.y + ball.size;
    for (var i = 0; i < bricks.length; i++) {
      let brickL = bricks[i].x;
      let brickB = bricks[i].y;
      let brickR = bricks[i].x + bricks[i].width;
      let brickT = bricks[i].y + bricks[i].height;
      if (ballR >= brickL && brickR >= ballL && ballT >= brickB && brickT >= ballB) {
        bricks.splice(i, 1);
        ball.xSpeed = -1 * ball.xSpeed;
        ball.ySpeed = -1 * ball.ySpeed;
        let num = Math.random();
        if (num < 0.7) {
          getPowerUp((brickL + brickR) / 2, brickT);
        }
      }
    }
  }
}
const gameLoop = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, cw, ch); //tło
  for (let ball of balls) {
    if (ball.isStopped) {
      ball.x = paddle.position.x + paddle.length / 2;
    }
    ball.move();
    ball.onHit(paddle);
    ball.draw();
    paddle.move();
  }

  for (let i = 0; i < bricks.length; i++) {
    bricks[i].draw();
  }
  paddle.draw();

  for (let i = 0; i < lives * 20; i += 20) {
    //rysowanie serc
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(7.5 + i, 4);
    ctx.bezierCurveTo(7.5 + i, 3.7, 7 + i, 2.5, 5 + i, 2.5);
    ctx.bezierCurveTo(2 + i, 2.5, 2 + i, 6.25, 2 + i, 6.25);
    ctx.bezierCurveTo(2 + i, 8, 4 + i, 10.2, 7.5 + i, 12);
    ctx.bezierCurveTo(11 + i, 10.2, 13 + i, 8, 13 + i, 6.25);
    ctx.bezierCurveTo(13 + i, 6.25, 13 + i, 2.5, 10 + i, 2.5);
    ctx.bezierCurveTo(8.5 + i, 2.5, 7.5 + i, 3.7, 7.5 + i, 4);
    ctx.fill();
  }

  if (powerups.length > 0) {
    for (let powerup of powerups) {
      powerup.fall();
      powerup.draw();
      for (let ball of balls) {
        if (powerup.hitPaddle(ball, paddle)) {
          powerups.splice(powerups.indexOf(powerup), 1);
        }
      }
      if (powerup.y > ch) powerups.shift();
      if (powerup.protect) chain = new rescueChainObj();
      if (powerup.addBall)
        balls.push(new Ball(paddle.position.x + paddle.length / 2, paddle.height + paddle.spaceFromBorder));
      if (powerup.addLife) lives++;
    }
  }
  if (chain) {
    chain.draw();
    for (let ball of balls) {
      if (ball.hitChain(chain)) chain = null;
    }
  }
  collision();
  //Game end check
  for (let ball of balls) {
    if (ball.outOfCanvas()) {
      balls.splice(balls.indexOf(ball), 1);
    }
  }
  if (balls.length <= 0) {
    if (lives > 1) {
      balls.push(new Ball(paddle.position.x + paddle.length / 2, paddle.height + paddle.spaceFromBorder));
      balls[0].isStopped = true;
      lives--;
      requestAnimationFrame(gameLoop);
    } else alert('Koniec gry, odśwież by zagrać jeszcze raz');
  } else if (bricks.length === 0) {
    alert('Gratulacje! Wygrałeś!');
  } else {
    requestAnimationFrame(gameLoop);
  }
};
document.addEventListener('click', e => {
  for (let ball of balls) {
    ball.isStopped = false;
  }
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

//Tworzenie powerupów w ramach testów, do poźniejszego usunięcia
document.addEventListener('keydown', e => {
  if (event.keyCode === 97) powerups.push(new enLargeBall(cw / 2 + 10, ch / 2));
  //numpad1
  else if (event.keyCode === 98) powerups.push(new shrinkBall(cw / 2 + 10, ch / 2));
  //numpad2
  else if (event.keyCode === 99) powerups.push(new enLargePaddle(cw / 2 + 10, ch / 2));
  //numpad3
  else if (event.keyCode === 100) powerups.push(new shrinkPaddle(cw / 2 + 10, ch / 2));
  //numpad4
  else if (event.keyCode === 101) powerups.push(new speedUpBall(cw / 2 + 10, ch / 2));
  //numpad5
  else if (event.keyCode === 102) powerups.push(new speedDownBall(cw / 2 + 10, ch / 2));
  //numpad6
  else if (event.keyCode === 103) powerups.push(new rescueChain(cw / 2 + 10, ch / 2));
  //numpad7
  else if (event.keyCode === 104) powerups.push(new speedUpPaddle(cw / 2 + 10, ch / 2));
  //numpad8
  else if (event.keyCode === 105) powerups.push(new addLife(cw / 2 + 10, ch / 2));
  //numpad9
  else if (event.keyCode === 96) powerups.push(new addBall(cw / 2 + 10, ch / 2));
  //numpad0
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

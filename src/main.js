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

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
export const cw = canvas.width;
export const ch = canvas.height;

const paddle = new Paddle();
const ball = new Ball(paddle.position.x + paddle.length / 2, paddle.height + paddle.spaceFromBorder);
const bricks = [];
const powerups = [];
let chain;
for (let i = 0; i <= 3; i++) {
  for (let j = 0; j <= 8; j++) {
    const brick = new Brick(30 + j * 60, 270 - i * 40);
    bricks.push(brick);
  }
}

function collision(){
  function getPowerUp(x,y){
    let num = Math.random()*10;
    if(num>0 && num<1){
      powerups.push(new enLargeBall(x,y));
    }
    else if(num>1 && num<2){
      powerups.push(new shrinkBall(x,y));
    }
    else if(num>2 && num<3){
      powerups.push(new enLargePaddle(x,y));
    }
    else if(num>3 && num<4){
      powerups.push(new shrinkPaddle(x,y));
    }
    else if(num>4 && num<5){
      powerups.push(new speedUpBall(x,y));
    }
  }
  for(let i = 0; i<bricks.length; i++){
    if((ball.x-ball.size >= bricks[i].x && ball.x-ball.size <= bricks[i].x+50 && ball.y+ball.size === bricks[i].y)||
    (ball.x-ball.size >= bricks[i].x && ball.x-ball.size <= bricks[i].x+50 && ball.y+ball.size === bricks[i].y+20)||
    (ball.y-ball.size >= bricks[i].y && ball.y-ball.size <= bricks[i].y+20 && ball.x+ball.size === bricks[i].x)||
    (ball.y-ball.size >= bricks[i].y && ball.y-ball.size <= bricks[i].y+20 && ball.x+ball.size === bricks[i].x+50)){
      bricks.splice(i,1);
      ball.xSpeed = -1*ball.xSpeed;
      ball.ySpeed = -1*ball.ySpeed;
      
      let num = Math.random();
      if(num<0.7){
        getPowerUp(bricks[i].x+25,bricks[i].y);
      }
  }
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
  collision();
  paddle.draw();
  ball.draw();

  if (powerups.length > 0) {
    for (let powerup of powerups) {
      powerup.fall();
      powerup.draw();
      if (powerup.hitPaddle(ball, paddle)) {
        powerups.shift();
      }
      if (powerup.y > ch) powerups.shift();
      if (powerup.protect) {
        chain = new rescueChainObj();
        console.log('yay');
      }
    }
  }
  if (chain) chain.draw();
  
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
  else if (event.keyCode === 104) chain = null; //numpad8, normalnie znika po zderzeniu z piłką
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
document.addEventListener('keyup', e => {
  console.log(powerups); //do sprawdzenia aktywnych powerupów
});

requestAnimationFrame(gameLoop);

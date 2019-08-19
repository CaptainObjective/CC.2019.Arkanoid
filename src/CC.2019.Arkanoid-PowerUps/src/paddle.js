import { ctx, cw, ch } from './main';

class Paddle {
  constructor(x) {
    this.x=x;
    this.length = 100;
    this.height = 10;
    this.spaceFromBorder = 10;
    this.color="yellow";
    this.speed=0.01;
    this.position={
      x:(cw-this.length)/2,
      y:ch-this.height-this.spaceFromBorder,
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.length,this.height);
  }
  move() {
    document.addEventListener("keydown",(event)=>{
      if(event.keyCode===37||event.keyCode===65){
        if(this.position.x>0){
          this.position.x -= this.speed;
        }
      }
      else if(event.keyCode===39||event.keyCode===68) {
        if(this.position.x<cw-this.length){
          this.position.x += this.speed
        }
      }
      ctx.clearRect(0,0,1000,800) //
      this.draw(ctx)
    })
}
}

export default Paddle;

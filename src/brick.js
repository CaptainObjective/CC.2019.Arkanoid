import { ctx, cw, ch } from './main';

class Brick{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.height = 20;
        this.width = 50;
    }
    draw() {
        ctx.fillStyle='red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Brick;
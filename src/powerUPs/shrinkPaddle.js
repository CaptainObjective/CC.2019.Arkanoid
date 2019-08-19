import { ctx, cw, ch } from '../main';
import PowerUp from '../powerUp';

class shrinkPaddle extends PowerUp {
    constructor(x,y) {
        super(x,y);
        this.size = 20;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.size, this.size/3);
        ctx.lineTo(this.x-8, this.y);
        ctx.lineTo(this.x-8, this.y);
        ctx.lineTo(this.x-3, this.y+this.size/6);
        ctx.lineTo(this.x-8, this.y+this.size/3);
        ctx.moveTo(this.x+this.size+8, this.y);
        ctx.lineTo(this.x+this.size+8, this.y);
        ctx.lineTo(this.x+this.size+8, this.y);
        ctx.lineTo(this.x+this.size+3, this.y+this.size/6);
        ctx.lineTo(this.x+this.size+8, this.y+this.size/3);
        ctx.fill();
    }
    workWithPaddle (paddle) {
        if (paddle.length>50) {
            paddle.length=paddle.length - 10;
            paddle.position.x += 5;
        }
    }
}

export default shrinkPaddle;
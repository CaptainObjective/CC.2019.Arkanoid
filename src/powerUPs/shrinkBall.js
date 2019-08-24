import { ctx, cw, ch } from '../main';
import PowerUp from '../powerUp';

class shrinkBall extends PowerUp {
    constructor(x,y) {
        super(x,y);
        this.size = 5;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, true);
        ctx.lineTo(this.x, this.y - 10);
        ctx.lineTo(this.x - 6, this.y - 14);
        ctx.lineTo(this.x + 6, this.y - 14);
        ctx.lineTo(this.x, this.y - 10);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + 10);
        ctx.lineTo(this.x - 6, this.y + 14);
        ctx.lineTo(this.x + 6, this.y + 14);
        ctx.lineTo(this.x, this.y + 10);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - 10, this.y);
        ctx.lineTo(this.x - 14, this.y - 6);
        ctx.lineTo(this.x - 14, this.y + 6);
        ctx.lineTo(this.x - 10, this.y);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 10, this.y);
        ctx.lineTo(this.x + 14, this.y - 6);
        ctx.lineTo(this.x + 14, this.y + 6);
        ctx.lineTo(this.x + 10, this.y);
        ctx.fill();
    }
    workWithBall (ball) {
        if (ball.size > 3) ball.size *= 0.8;
    }
}

export default shrinkBall;
import { ctx, cw, ch } from '../main';
import PowerUp from '../powerUp';

class enLargeBall extends PowerUp {
    constructor(x,y) {
        super(x,y);
        this.size = 7;
    }
    draw() {
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, true);
        ctx.lineTo(this.x, this.y-14);
        ctx.lineTo(this.x-6, this.y-10);
        ctx.lineTo(this.x+6, this.y-10);
        ctx.lineTo(this.x, this.y-14);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y+14);
        ctx.lineTo(this.x-6, this.y+10);
        ctx.lineTo(this.x+6, this.y+10);
        ctx.lineTo(this.x, this.y+14);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x-14, this.y);
        ctx.lineTo(this.x-10, this.y-6);
        ctx.lineTo(this.x-10, this.y+6);
        ctx.lineTo(this.x-14, this.y);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x+14, this.y);
        ctx.lineTo(this.x+10, this.y-6);
        ctx.lineTo(this.x+10, this.y+6);
        ctx.lineTo(this.x+14, this.y);
        ctx.fill();
    }
    workWithBall (ball) {
        ball.size *= 1.2;
    }
}

export default enLargeBall;
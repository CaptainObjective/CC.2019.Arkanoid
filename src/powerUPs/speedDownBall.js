import { ctx, cw, ch } from '../main';
import PowerUp from '../powerUp';

class speedDownBall extends PowerUp {
    constructor(x,y) {
        super(x,y);
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(this.x - 2, this.y);
        ctx.lineTo(this.x, this.y - 2);
        ctx.lineTo(this.x - 3, this.y - 5);
        ctx.lineTo(this.x - 5, this.y - 3);
        ctx.lineTo(this.x - 2, this.y);
        ctx.moveTo(this.x - 7, this.y - 5);
        ctx.lineTo(this.x - 5, this.y - 7);
        ctx.lineTo(this.x - 8, this.y - 10);
        ctx.lineTo(this.x - 10, this.y - 8);
        ctx.lineTo(this.x - 7, this.y - 5);
        ctx.moveTo(this.x - 12, this.y - 10);
        ctx.lineTo(this.x - 10, this.y - 12);
        ctx.lineTo(this.x - 13, this.y - 15);
        ctx.lineTo(this.x - 15, this.y - 13);
        ctx.lineTo(this.x - 12, this.y - 10);
        ctx.moveTo(this.x - 13, this.y - 19);
        ctx.lineTo(this.x - 19, this.y - 13);
        ctx.lineTo(this.x - 19, this.y - 19);
        ctx.lineTo(this.x - 13, this.y - 19);
        ctx.fill();
    }
    workWithBall (ball) {
        if (ball.speedMultiply > 0.3) ball.speedMultiply -= 0.3;
    }
}

export default speedDownBall;
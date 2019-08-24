import { ctx, cw, ch } from '../main';
import PowerUp from '../powerUp';

class addBall extends PowerUp {
    constructor(x,y) {
        super(x,y);
        this.size = 10;
    }
    draw() {
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, true);
        ctx.fill();
        ctx.clearRect(this.x-2, this.y-8, 4, 16);
        ctx.clearRect(this.x-8, this.y-2, 16, 4);
    }
    work() {
        this.addBall = true;
    }
}

export default addBall;
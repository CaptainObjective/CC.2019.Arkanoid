import { ctx, cw, ch } from '../main';
import PowerUp from '../powerUp';

class speedUpPaddle extends PowerUp {
    constructor(x,y) {
        super(x,y);
        this.size = 8
    }
    draw() {
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.size, this.size / 3);
        ctx.fillRect(this.x + this.size + 3, this.y, this.size, this.size / 3);
        ctx.fillRect(this.x + 2 * this.size + 6, this.y, this.size, this.size / 3);        
        ctx.fill();
    }
    workWithPaddle (paddle) {
        paddle.speed += 1;
    }
}

export default speedUpPaddle;
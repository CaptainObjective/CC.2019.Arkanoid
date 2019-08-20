import { ctx, cw, ch } from '../main';
import PowerUp from '../powerUp';

class addLife extends PowerUp {
    constructor(x,y) {
        super(x,y);
        this.size = 10;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(7.5 + this.x, 4 + this.y);
        ctx.bezierCurveTo(7.5 + this.x, 3.7 + this.y, 7 + this.x, 2.5 + this.y, 5 + this.x, 2.5 + this.y);
        ctx.bezierCurveTo(2 + this.x, 2.5 + this.y, 2 + this.x, 6.25 + this.y, 2 + this.x, 6.25 + this.y);
        ctx.bezierCurveTo(2 + this.x, 8 + this.y, 4 + this.x, 10.2 + this.y, 7.5 + this.x, 12 + this.y);
        ctx.bezierCurveTo(11 + this.x, 10.2 + this.y, 13 + this.x, 8 + this.y, 13 + this.x, 6.25 + this.y);
        ctx.bezierCurveTo(13 + this.x, 6.25 + this.y, 13 + this.x, 2.5 + this.y, 10 + this.x, 2.5 + this.y);
        ctx.bezierCurveTo(8.5 + this.x, 2.5 + this.y, 7.5 + this.x, 3.7 + this.y, 7.5 + this.x, 4 + this.y);
        ctx.fill();
    }
    work() {
        this.addLife = true;
    }
}

export default addLife;
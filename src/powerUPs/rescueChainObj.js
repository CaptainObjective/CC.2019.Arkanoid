import { ctx, cw, ch } from '../main';

//Osłona, która uratuje piłkę przed upadkiem
class rescueChainObj {
    constructor() {
        this.size = cw;
        this.x = 0;
        this.y = ch - 10;
    }
    draw() {
        ctx.fillStyle = 'gold';
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.size, 5);
        ctx.fill();
    }
}

export default rescueChainObj;
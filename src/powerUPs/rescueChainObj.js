import { ctx, cw, ch } from '../main';

//Osłona, która uratuje piłkę przed upadkiem
class rescueChainObj {
    constructor() {
        this.size=cw;
    }
    draw() {
        ctx.fillStyle = 'gold';
        ctx.beginPath();
        ctx.fillRect(0, ch-10, this.size, 5);
        ctx.fill();
    }
}

export default rescueChainObj;
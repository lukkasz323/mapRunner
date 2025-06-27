import { generateNewId } from '../../global.js';
export class Item {
    id;
    constructor(id = generateNewId()) {
        this.id = id;
    }
}

import { generateNewId } from '../../global.js';
export class Item {
    id;
    $displayName = 'Item';
    $type = 'Generic';
    constructor(id = generateNewId()) {
        this.id = id;
    }
}

import { Item } from './item.js';
export class Xp extends Item {
    quantity;
    $displayName = 'XP';
    $type = 'Xp';
    constructor(quantity) {
        super();
        this.quantity = quantity;
    }
}

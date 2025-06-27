import { Item } from './item.js';
export class Gold extends Item {
    quantity;
    $displayName = 'Gold';
    $type = 'Gold';
    constructor(quantity) {
        super();
        this.quantity = quantity;
    }
}

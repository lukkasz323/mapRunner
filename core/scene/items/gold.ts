import { IQuantity } from './i-quantity.js';
import { ItemType } from './item-type.js';
import { Item } from './item.js';

export class Gold extends Item implements IQuantity {
    $displayName = 'Gold';
    $type: ItemType = 'Gold';

    constructor(public quantity: number) {
        super();
    }
}
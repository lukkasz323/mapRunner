import { IQuantity } from './i-quantity.js';
import { ItemType } from './item-type.js';
import { Item } from './item.js';

export class Xp extends Item implements IQuantity {
    $displayName = 'XP';
    $type: ItemType = 'Xp';

    constructor(public quantity: number) {
        super();
    }
}
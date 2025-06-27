import { Item } from './item.js';
import { ItemType } from './item-type.js';

export class Shield extends Item {
    $displayName = 'Shield';
    $type: ItemType = 'OffHand';
}
import { Item } from './item.js';
import { ItemType } from './item-type.js';

export class Ring extends Item {
    $displayName = 'Ring';
    $type: ItemType = 'Ring';
}
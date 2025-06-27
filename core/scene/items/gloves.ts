import { Item } from './item.js';
import { ItemType } from './item-type.js';

export class Gloves extends Item {
    $displayName = 'Gloves';
    $type: ItemType = 'Gloves';
}
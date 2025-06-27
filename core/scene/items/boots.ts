import { Item } from './item.js';
import { ItemType } from './item-type.js';

export class Boots extends Item {
    $displayName = 'Boots';
    $type: ItemType = 'Boots';
}
import { Item } from './item.js';
import { ItemType } from './item-type.js';

export class Belt extends Item {
    $displayName = 'Belt';
    $type: ItemType = 'Belt';
}
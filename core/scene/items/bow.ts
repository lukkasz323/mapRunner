import { Item } from './item.js';
import { ItemType } from './item-type.js';

export class Bow extends Item {
    $displayName = 'Bow';
    $type: ItemType = 'MainHand';
}
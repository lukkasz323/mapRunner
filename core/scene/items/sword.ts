import { Item } from './item.js';
import { ItemType } from './item-type.js';

export class Sword extends Item {
    $displayName = 'Sword';
    $type: ItemType = 'MainHand';
}
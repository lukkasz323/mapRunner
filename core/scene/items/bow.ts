
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { Rarity } from './components/rarity.js';

export class Bow extends Item {
    $displayName = 'Bow';
    $type: ItemType = 'MainHand';
    rarity = new Rarity();
}
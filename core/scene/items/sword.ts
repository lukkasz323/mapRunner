
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { Rarity } from './components/rarity.js';

export class Sword extends Item {
    $displayName = 'Sword';
    $type: ItemType = 'MainHand';
    rarity = new Rarity();
}
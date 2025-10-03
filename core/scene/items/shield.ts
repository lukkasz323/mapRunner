
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { Rarity } from './components/rarity.js';

export class Shield extends Item {
    $displayName = 'Shield';
    $type: ItemType = 'OffHand';
    rarity = new Rarity();
}
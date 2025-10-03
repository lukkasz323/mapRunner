
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { Rarity } from './components/rarity.js';

export class Ring extends Item {
    $displayName = 'Ring';
    $type: ItemType = 'Ring';
    rarity = new Rarity();
}
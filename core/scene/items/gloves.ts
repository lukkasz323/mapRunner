
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { Rarity } from './components/rarity.js';

export class Gloves extends Item {
    $displayName = 'Gloves';
    $type: ItemType = 'Gloves';
    rarity = new Rarity();
}
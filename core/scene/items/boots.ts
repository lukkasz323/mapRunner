
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { Rarity } from './components/rarity.js';

export class Boots extends Item {
    $displayName = 'Boots';
    $type: ItemType = 'Boots';
    rarity = new Rarity();
}
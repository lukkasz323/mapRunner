
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { Rarity } from './components/rarity.js';

export class Belt extends Item {
    $displayName = 'Belt';
    $type: ItemType = 'Belt';
    rarity = new Rarity();
}
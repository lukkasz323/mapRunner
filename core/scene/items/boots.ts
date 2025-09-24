
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { IRarity } from './i-rarity.js';

export class Boots extends Item implements IRarity {
    $displayName = 'Boots';
    $type: ItemType = 'Boots';
    mods = [];
    percentile = 0;
}
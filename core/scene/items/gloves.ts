
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { IRarity } from './i-rarity.js';

export class Gloves extends Item implements IRarity {
    $displayName = 'Gloves';
    $type: ItemType = 'Gloves';
    mods = [];
    percentile = 0;
}
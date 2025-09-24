
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { IRarity } from './i-rarity.js';

export class Belt extends Item implements IRarity {
    $displayName = 'Belt';
    $type: ItemType = 'Belt';
    mods = [];
    percentile = 0;
}
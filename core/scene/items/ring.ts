
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { IRarity } from './i-rarity.js';

export class Ring extends Item implements IRarity {
    $displayName = 'Ring';
    $type: ItemType = 'Ring';
    mods = [];
    percentile = 0;
}
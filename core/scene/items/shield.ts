
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { IRarity } from './i-rarity.js';

export class Shield extends Item implements IRarity {
    $displayName = 'Shield';
    $type: ItemType = 'OffHand';
    mods = [];
    percentile = 0;
}
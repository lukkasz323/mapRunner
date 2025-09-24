
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { IRarity } from './i-rarity.js';

export class Helmet extends Item implements IRarity {
    $displayName = 'Helmet';
    $type: ItemType = 'Helmet';
    mods = [];
    percentile = 0;
}
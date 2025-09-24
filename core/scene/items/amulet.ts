
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { IRarity } from './i-rarity.js';

export class Amulet extends Item implements IRarity {
    $displayName = 'Amulet';
    $type: ItemType = 'Amulet';
    mods = [];
    percentile = 0;
}
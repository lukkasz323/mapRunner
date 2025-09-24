
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { IRarity } from './i-rarity.js';

export class Bow extends Item implements IRarity {
    $displayName = 'Bow';
    $type: ItemType = 'MainHand';
    mods = [];
    percentile = 0;
}
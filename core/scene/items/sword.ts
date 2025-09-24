
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { IRarity } from './i-rarity.js';

export class Sword extends Item implements IRarity {
    $displayName = 'Sword';
    $type: ItemType = 'MainHand';
    mods = [];
    percentile = 0;
}
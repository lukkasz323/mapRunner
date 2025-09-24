
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { IRarity } from './i-rarity.js';

export class Chainmail extends Item implements IRarity {
    $displayName = 'Chainmail';
    $type: ItemType = 'BodyArmor';
    mods = [];
    percentile = 0;
}
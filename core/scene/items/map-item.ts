
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { IRarity } from './i-rarity.js';

export class MapItem extends Item implements IRarity {
    $displayName = 'Map';
    mods = [];
    percentile = 0;

    constructor(public tier: number) {
        super();
    }
}
import { Item } from './item.js';
export class MapItem extends Item {
    tier;
    $displayName = 'Map';
    mods = [];
    percentile = 0;
    constructor(tier) {
        super();
        this.tier = tier;
    }
}

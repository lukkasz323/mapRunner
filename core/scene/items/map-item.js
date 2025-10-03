import { Item } from './item.js';
import { Rarity } from './components/rarity.js';
export class MapItem extends Item {
    tier;
    $displayName = 'Map';
    rarity = new Rarity();
    constructor(tier) {
        super();
        this.tier = tier;
    }
}

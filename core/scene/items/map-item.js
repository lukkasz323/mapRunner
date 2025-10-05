import { Item } from './item.js';
import { Rarity } from './components/rarity.js';
import { clamp } from '../../../utils/utils.js';
export class MapItem extends Item {
    tier;
    $displayName = 'Map';
    rarity = new Rarity();
    constructor(tier) {
        super();
        this.tier = tier;
    }
    getSurvivability(character) {
        const x = 0.01 * character.str;
        return clamp(x, 0, 1);
    }
}

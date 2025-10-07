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
    getSurvivability(character) {
        const strFactor = 1 + (0.01 * character.str);
        const formula = 1 * strFactor;
        return formula; // No clamp for now - clamp(formula, 0, 1)
    }
}

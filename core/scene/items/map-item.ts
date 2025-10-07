
import { Item } from './item.js';
import { Rarity, IRarity } from './components/rarity.js';
import { Character } from '../character.js';

export class MapItem extends Item implements IRarity {
    $displayName = 'Map';
    rarity = new Rarity();

    constructor(public tier: number) {
        super();
    }

    getSurvivability(character: Character): number {
        const strFactor = 1 + (0.01 * character.str);
        const formula = 1 * strFactor;
        return formula; // No clamp for now - clamp(formula, 0, 1)
    }
}
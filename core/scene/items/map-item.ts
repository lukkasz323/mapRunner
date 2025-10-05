
import { Item } from './item.js';
import { Rarity, IRarity } from './components/rarity.js';
import { Character } from '../character.js';
import { clamp } from '../../../utils/utils.js';

export class MapItem extends Item implements IRarity {
    $displayName = 'Map';
    rarity = new Rarity();

    constructor(public tier: number) {
        super();
    }

    getSurvivability(character: Character): number {
        const x = 0.01 * character.str
        return clamp(x, 0, 1) 
    }
}
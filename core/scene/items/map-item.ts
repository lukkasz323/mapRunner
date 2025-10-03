
import { Item } from './item.js';
import { Rarity, IRarity } from './components/rarity.js';

export class MapItem extends Item implements IRarity {
    $displayName = 'Map';
    rarity = new Rarity();

    constructor(public tier: number) {
        super();
    }
}
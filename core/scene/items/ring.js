import { Item } from './item.js';
import { Rarity } from './components/rarity.js';
export class Ring extends Item {
    $displayName = 'Ring';
    $type = 'Ring';
    rarity = new Rarity();
}

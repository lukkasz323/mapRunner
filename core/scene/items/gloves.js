import { Item } from './item.js';
import { Rarity } from './components/rarity.js';
export class Gloves extends Item {
    $displayName = 'Gloves';
    $type = 'Gloves';
    rarity = new Rarity();
}

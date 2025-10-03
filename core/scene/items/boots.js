import { Item } from './item.js';
import { Rarity } from './components/rarity.js';
export class Boots extends Item {
    $displayName = 'Boots';
    $type = 'Boots';
    rarity = new Rarity();
}

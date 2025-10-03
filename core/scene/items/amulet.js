import { Item } from './item.js';
import { Rarity } from './components/rarity.js';
export class Amulet extends Item {
    $displayName = 'Amulet';
    $type = 'Amulet';
    rarity = new Rarity();
}

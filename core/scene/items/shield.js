import { Item } from './item.js';
import { Rarity } from './components/rarity.js';
export class Shield extends Item {
    $displayName = 'Shield';
    $type = 'OffHand';
    rarity = new Rarity();
}

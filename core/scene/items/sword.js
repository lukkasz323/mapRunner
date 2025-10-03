import { Item } from './item.js';
import { Rarity } from './components/rarity.js';
export class Sword extends Item {
    $displayName = 'Sword';
    $type = 'MainHand';
    rarity = new Rarity();
}

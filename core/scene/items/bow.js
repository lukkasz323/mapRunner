import { Item } from './item.js';
import { Rarity } from './components/rarity.js';
export class Bow extends Item {
    $displayName = 'Bow';
    $type = 'MainHand';
    rarity = new Rarity();
}

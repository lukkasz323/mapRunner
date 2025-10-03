import { Item } from './item.js';
import { Rarity } from './components/rarity.js';
export class Belt extends Item {
    $displayName = 'Belt';
    $type = 'Belt';
    rarity = new Rarity();
}

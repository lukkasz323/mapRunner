import { Item } from './item.js';
import { Rarity } from './components/rarity.js';
export class Chainmail extends Item {
    $displayName = 'Chainmail';
    $type = 'BodyArmor';
    rarity = new Rarity();
}

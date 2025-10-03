import { Item } from './item.js';
import { Rarity } from './components/rarity.js';
export class Helmet extends Item {
    $displayName = 'Helmet';
    $type = 'Helmet';
    rarity = new Rarity();
}

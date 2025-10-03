
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { Rarity } from './components/rarity.js';

export class Helmet extends Item {
    $displayName = 'Helmet';
    $type: ItemType = 'Helmet';
    rarity = new Rarity();
}
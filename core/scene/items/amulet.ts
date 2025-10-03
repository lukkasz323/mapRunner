
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { Rarity } from './components/rarity.js';

export class Amulet extends Item {
    $displayName = 'Amulet';
    $type: ItemType = 'Amulet';
    rarity = new Rarity();
}
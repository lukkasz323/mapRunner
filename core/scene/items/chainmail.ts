
import { Item } from './item.js';
import { ItemType } from './item-type.js';
import { Rarity } from './components/rarity.js';

export class Chainmail extends Item {
    $displayName = 'Chainmail';
    $type: ItemType = 'BodyArmor';
    rarity = new Rarity();
}
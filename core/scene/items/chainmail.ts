import { Item } from './item.js';
import { ItemType } from './item-type.js';

export class Chainmail extends Item {
    $displayName = 'Chainmail';
    $type: ItemType = 'BodyArmor';
}
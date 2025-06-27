import { Item } from './item.js';
import { ItemType } from './item-type.js';

export class Amulet extends Item {
    $displayName = 'Amulet';
    $type: ItemType = 'Amulet';
}
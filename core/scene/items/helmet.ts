import { Item } from './item.js';
import { ItemType } from './item-type.js';

export class Helmet extends Item {
    $displayName = 'Helmet';
    $type: ItemType = 'Helmet';
}
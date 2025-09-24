import { Item } from './item.js';
export class Bow extends Item {
    $displayName = 'Bow';
    $type = 'MainHand';
    mods = [];
    percentile = 0;
}

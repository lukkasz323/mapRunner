import { generateNewId } from '../../global.js';
import { ItemType } from './item-type.js';

export class Item {
    $displayName: string = 'Item';
    $type: ItemType = 'Generic'; 

    constructor(public id: number = generateNewId()) {
    }
}
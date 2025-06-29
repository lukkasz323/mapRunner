import { generateNewId } from '../../global.js';
import { ItemType } from './item-type.js';

export abstract class Item {
    abstract $displayName: string;
    abstract $type: ItemType;

    constructor(public id: number = generateNewId()) {
    }
}
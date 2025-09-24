import { Item } from './item.js';
import { Mod } from './mod.js';

export interface IRarity extends Item {
    mods: Mod[];
    percentile: number
}
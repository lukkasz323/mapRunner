import { Item } from "../item.js";
import { Mod } from "../mod.js";

export interface IRarity extends Item {
    rarity: Rarity;
}

export class Rarity {
    constructor(public mods: Mod[] = [], public percentile: number = Math.random()) {
    }
}


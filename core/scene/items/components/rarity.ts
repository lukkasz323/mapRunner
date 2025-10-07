import { rollMods } from "../../../drops.js";
import { Item } from "../item.js";
import { Mod } from "../mod.js";

export interface IRarity extends Item {
    rarity: Rarity;
}

export class Rarity {
    constructor(public mods: Mod[] = rollMods(), public percentile: number = Math.random()) {
    }

    getColor(): string {
        switch (this.mods.length) {
            default:
                return 'blue';
            case 1:
                return 'red';
            case 2:
                return 'blue';
            case 3:
                return 'purple';
            case 4:
                return 'orange';
            case 5:
                return 'red';
            
        }
    }
}


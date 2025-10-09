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
        const modCount: number = this.mods.length;

        if (modCount > 6) return 'indigo';
        if (modCount === 6) return 'magenta';
        if (modCount === 5) return 'orangeRed';
        if (modCount === 4) return 'gold';
        if (modCount === 3) return 'lime';
        if (modCount === 2) return 'cyan';
        if (modCount === 1) return 'blue';
        return 'gray';
    }
}
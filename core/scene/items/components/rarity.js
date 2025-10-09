import { rollMods } from "../../../drops.js";
export class Rarity {
    mods;
    percentile;
    constructor(mods = rollMods(), percentile = Math.random()) {
        this.mods = mods;
        this.percentile = percentile;
    }
    getColor() {
        const modCount = this.mods.length;
        if (modCount > 6)
            return 'indigo';
        if (modCount === 6)
            return 'magenta';
        if (modCount === 5)
            return 'orangeRed';
        if (modCount === 4)
            return 'gold';
        if (modCount === 3)
            return 'lime';
        if (modCount === 2)
            return 'cyan';
        if (modCount === 1)
            return 'blue';
        return 'gray';
    }
}

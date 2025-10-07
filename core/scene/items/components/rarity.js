import { rollMods } from "../../../drops.js";
export class Rarity {
    mods;
    percentile;
    constructor(mods = rollMods(), percentile = Math.random()) {
        this.mods = mods;
        this.percentile = percentile;
    }
    getColor() {
        switch (this.mods.length) {
            default:
                return 'gray';
            case 1:
                return 'green';
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

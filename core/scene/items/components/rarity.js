export class Rarity {
    mods;
    percentile;
    constructor(mods = [], percentile = Math.random()) {
        this.mods = mods;
        this.percentile = percentile;
    }
}

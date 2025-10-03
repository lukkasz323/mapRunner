import { Mod } from "../mod.js";

export class Rarity {
    constructor(public mods: Mod[] = [], public percentile: number = 0) {
    }
}
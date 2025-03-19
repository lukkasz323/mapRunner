import { Gold } from "./items/gold.js";
import { Item } from "./items/item.js";
import { Sword } from "./items/sword.js";
import { Xp } from "./items/xp.js";

export class MapItem {
    tier: 1;

    run(): Item[] {
        const loot = [];

        loot.push(new Xp(5 + Math.ceil(Math.random() * 5)));
        loot.push(new Gold(Math.ceil(Math.random() * 100)));
        loot.push(new Sword());

        return loot;
    }
}
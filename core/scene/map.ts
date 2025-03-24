import { Gold } from "./items/gold.js";
import { Item } from "./items/item.js";
import { Sword } from "./items/sword.js";
import { Xp } from "./items/xp.js";

export class MapItem {
    tier = 1;

    loot(): Item[] {
        const loot = [];

        loot.push(new Xp(this.tier * (4 + (Math.ceil(Math.random() * 4)))));
        loot.push(new Gold(Math.ceil(Math.random() * 100)));
        loot.push(new Sword());

        return loot;
    }
}
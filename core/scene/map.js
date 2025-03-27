import { Gold } from "./items/gold.js";
import { Sword } from "./items/sword.js";
import { Xp } from "./items/xp.js";
export class MapItem {
    tier = 1;
    loot() {
        const loot = [];
        loot.push(new Gold(Math.ceil(Math.random() * 100)));
        loot.push(new Xp(this.tier * (4 + (Math.ceil(Math.random() * 4)))));
        loot.push(new Sword());
        return loot;
    }
}

import { Inventory } from "./inventory.js";
import { Gold } from "./items/gold.js";
import { Sword } from "./items/sword.js";
import { Xp } from "./items/xp.js";
export class MapItem {
    tier = 1;
    run() {
        const loot = new Inventory();
        loot.items.push(new Xp(this.tier * (4 + (Math.ceil(Math.random() * 4)))));
        loot.items.push(new Gold(Math.ceil(Math.random() * 100)));
        loot.items.push(new Sword());
        return loot;
    }
}

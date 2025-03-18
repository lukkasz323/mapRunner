import { Gold } from "./items/gold.js";
import { Sword } from "./items/sword.js";
export class MapItem {
    tier;
    run() {
        const loot = [];
        loot.push(new Gold(Math.ceil(Math.random() * 100)));
        loot.push(new Sword());
        return loot;
    }
}

import { Inventory } from './inventory.js';
import { Xp } from './items/xp.js';
import { Gold } from './items/gold.js';
import { rollItem } from '../drops.js';
export class MapRunner {
    run(mapItem) {
        const loot = new Inventory({ x: 0, y: 0 });
        loot.tryAddItem(new Xp(mapItem.tier * (4 + (Math.ceil(Math.random() * 4)))));
        loot.tryAddItem(new Gold(mapItem.tier * Math.ceil(Math.random() * 100)));
        for (let i = 0; i < mapItem.tier; i++) {
            loot.tryAddItem(rollItem());
        }
        return loot;
    }
}

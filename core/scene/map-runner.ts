import { Inventory } from './inventory.js';
import { Xp } from './items/xp.js';
import { Gold } from './items/gold.js';
import { Sword } from './items/sword.js';
import { Bow } from './items/bow.js';
import { Shield } from './items/shield.js';
import { Gloves } from './items/gloves.js';
import { Boots } from './items/boots.js';
import { Amulet } from './items/amulet.js';
import { Belt } from './items/belt.js';
import { Ring } from './items/ring.js';
import { Chainmail } from './items/chainmail.js';
import { Helmet } from './items/helmet.js';

export class MapRunner {
    tier = 1;

    run(): Inventory {
        const loot = new Inventory({x: 8, y: 8});
        
        loot.tryAddItem(new Xp(this.tier * (4 + (Math.ceil(Math.random() * 4)))));
        loot.tryAddItem(new Gold(Math.ceil(Math.random() * 100)));
        loot.tryAddItem(new Sword());
        loot.tryAddItem(new Bow());
        loot.tryAddItem(new Chainmail());
        loot.tryAddItem(new Helmet());
        loot.tryAddItem(new Shield());
        loot.tryAddItem(new Gloves());
        loot.tryAddItem(new Boots());
        loot.tryAddItem(new Belt());
        loot.tryAddItem(new Amulet());
        loot.tryAddItem(new Ring());
        loot.tryAddItem(new Ring());
        loot.tryAddItem(new Ring());

        return loot;
    }
}
import { Vector2 } from "../../utils/vector2.js";
import { Inventory } from "./inventory.js";
import { IQuantity } from "./items/iQuantity.js";
import { Item } from "./items/item.js";
import { Xp } from "./items/xp.js";

export class Character {
    level = 1;
    xp: Xp;
    xpRequired = 10;
    str = 10;
    dex = 10;
    int = 10;
    health = 100;
    inventory: Inventory = new Inventory();
    
    mainHand: Item = null;
    offHand: Item = null;
    bodyarmor: Item = null;
    helmet: Item = null;
    boots: Item = null;
    gloves: Item = null;
    belt: Item = null;
    amulet: Item = null;
    leftRing: Item = null;
    rightRing: Item = null;
    constructor(public name: string) {
        this.xp = new Xp(0);
        this.inventory.items.push(this.xp);
        this.inventory
    }

    tryLevelUp() {
        if (this.xp.quantity >= this.xpRequired) {
            this.xp.quantity -= this.xpRequired;
            this.xpRequired *= 2;
            this.level += 1;

            this.str += 1;
            this.dex += 1;
            this.int += 1;
            this.health *= 1.1;
            this.health = Math.round(this.health);

            this.tryLevelUp();
        }
    }
}
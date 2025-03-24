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
    inventory: Item[] = [];
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
        this.inventory.push(this.xp);
    }

    loot(loot: Item[]) {
        for (const lootItem of loot) {
            if ("quantity" in lootItem) {
                const invItemIndex = this.inventory.findIndex(invItem => invItem.displayName === lootItem.displayName);
                if (invItemIndex !== -1) {
                    (this.inventory[invItemIndex] as IQuantity).quantity += (lootItem as IQuantity).quantity;
                } else {
                    this.inventory.push(lootItem); 
                }
            } else {
                this.inventory.push(lootItem);
            }
        }
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
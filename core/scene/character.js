import { Xp } from "./items/xp.js";
export class Character {
    name;
    level = 1;
    xp;
    xpRequired = 10;
    str = 10;
    dex = 10;
    int = 10;
    health = 100;
    inventory = [];
    mainHand = null;
    offHand = null;
    bodyarmor = null;
    helmet = null;
    boots = null;
    gloves = null;
    belt = null;
    amulet = null;
    leftRing = null;
    rightRing = null;
    constructor(name) {
        this.name = name;
        this.xp = new Xp(0);
        this.inventory.push(this.xp);
    }
    loot(loot) {
        for (const lootItem of loot) {
            if ("quantity" in lootItem) {
                const invItemIndex = this.inventory.findIndex(invItem => invItem.displayName === lootItem.displayName);
                if (invItemIndex !== -1) {
                    this.inventory[invItemIndex].quantity += lootItem.quantity;
                }
                else {
                    this.inventory.push(lootItem);
                }
            }
            else {
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

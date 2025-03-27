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
    invSize = { x: 8, y: 5 };
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
    getMaxInvLength() {
        return this.invSize.x * this.invSize.y;
    }
    inventoryHasSpace() {
        return this.inventory.length < this.getMaxInvLength();
    }
    tryTransferItemToInventory(container, itemIndex) {
        const transferedItem = container.splice(itemIndex, 1)[0];
        const invItem = this.inventory.find(invItem => invItem.displayName === transferedItem.displayName);
        if (invItem && "quantity" in transferedItem) {
            invItem.quantity += transferedItem.quantity;
        }
        else if (this.inventoryHasSpace()) {
            this.inventory.push(transferedItem);
        }
        else {
            return false;
        }
        return true;
    }
    loot(loot) {
        // Transfter until loot empty
        while (loot.length !== 0) {
            this.tryTransferItemToInventory(loot, 0);
        }
        // let addObject = false;
        // for (const lootItem of loot) {
        //     console.log(loot);
        //     if ("quantity" in lootItem && typeof lootItem.quantity === "number") {
        //         const invItemIndex = this.inventory.findIndex(invItem => invItem.displayName === lootItem.displayName);
        //         if (invItemIndex !== -1) {
        //             // Remove item from loot, and add IT'S QUANTITY to existing inventory item.
        //             loot.splice(loot.findIndex(item => item.displayName === lootItem.displayName), 1);
        //             (this.inventory[invItemIndex] as IQuantity).quantity += lootItem.quantity;
        //         } else {
        //             addObject = true;
        //         }
        //     } else {
        //         addObject = true
        //     }
        //     if (addObject && this.inventory.length < this.getInvLength()) {
        //         // Remove item from loot, and add IT to inventory.
        //         loot.splice(loot.findIndex(item => item.displayName === lootItem.displayName), 1);
        //         this.inventory.push(lootItem);
        //     }
        // }
        // console.log(1);
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

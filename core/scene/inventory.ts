import { Vector2 } from "../../utils/vector2.js";
import { IQuantity } from "./items/iQuantity.js";
import { Item } from "./items/item.js";

export class Inventory {
    items: Item[] = [];
    size: Vector2 = {x: 8, y: 5};

    constructor() {
    }

    getMaxInvLength() {
        return this.size.x * this.size.y;
    }

    inventoryHasSpace() {
        return this.items.length < this.getMaxInvLength();
    }

    tryTransferItem(container: Item[], itemIndex: number): boolean {
        const transferedItem: Item = container[itemIndex];
        
        const invItem = this.items.find(invItem => invItem.displayName === transferedItem.displayName);
        if (invItem && "quantity" in transferedItem) {
            container.splice(itemIndex, 1)[0];
            (invItem as IQuantity).quantity += (transferedItem as IQuantity).quantity;
        } else if (this.inventoryHasSpace()) {
            container.splice(itemIndex, 1)[0];
            this.items.push(transferedItem);
        } else {
            return false;
        }

        return true;
    }

    loot(loot: Item[]) {
        while (loot.length !== 0) {
            this.tryTransferItem(loot, 0);
        }

        // let addObject = false;

        // for (const lootItem of loot) {
        //     console.log(loot);
        //     if ("quantity" in lootItem && typeof lootItem.quantity === "number") {
        //         const invItemIndex = this.items.findIndex(invItem => invItem.displayName === lootItem.displayName);
        //         if (invItemIndex !== -1) {
        //             // Remove item from loot, and add IT'S QUANTITY to existing inventory item.
        //             loot.splice(loot.findIndex(item => item.displayName === lootItem.displayName), 1);
        //             (this.items[invItemIndex] as IQuantity).quantity += lootItem.quantity;
        //         } else {
        //             addObject = true;
        //         }
        //     } else {
        //         addObject = true
        //     }

        //     if (addObject && this.items.length < this.getInvLength()) {
        //         // Remove item from loot, and add IT to inventory.
        //         loot.splice(loot.findIndex(item => item.displayName === lootItem.displayName), 1);
        //         this.items.push(lootItem);
        //     }
        // }
        // console.log(1);
    }
}
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

    tryTransferItem(inventory: Inventory, itemIndex: number): boolean {
        const transferedItem: Item = inventory.items[itemIndex];
        
        const invItem = this.items.find(invItem => invItem.displayName === transferedItem.displayName);
        if (invItem && "quantity" in transferedItem) {
            inventory.items.splice(itemIndex, 1)[0];
            (invItem as IQuantity).quantity += (transferedItem as IQuantity).quantity;
        } else if (this.inventoryHasSpace()) {
            inventory.items.splice(itemIndex, 1)[0];
            this.items.push(transferedItem);
        } else {
            return false;
        }

        return true;
    }

    loot(loot: Inventory) {
        while (loot.items.length !== 0) {
            this.tryTransferItem(loot, 0);
        }
    }
}
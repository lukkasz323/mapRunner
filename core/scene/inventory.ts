import { Vector2 } from '../../utils/vector2.js';
import { IQuantity } from './items/i-quantity.js';
import { Item } from './items/item.js';

export class Inventory {
    items: Item[] = [];

    constructor(public size: Vector2 = null) {
    }

    getMaxInvLength() {
        return this.size.x * this.size.y;
    }

    inventoryHasSpace() {
        if (!this.size) {
            return true;
        }
        return this.items.length < this.getMaxInvLength();
    }

    removeItemAt(index: number): Item {
        return this.items.splice(index, 1)[0];
    }

    tryAddItem(newItem: Item): boolean {
        if (!newItem) return false;

        const invItem = this.items.find(invItem => invItem.$displayName === newItem.$displayName);
        if (invItem && 'quantity' in newItem) {
            (invItem as IQuantity).quantity += (newItem as IQuantity).quantity; // Adding quantity to existing item
        } else if (this.inventoryHasSpace()) {
            this.items.push(newItem); // Adding new item
        } else {
            return false; // No space
        }
        return true;
    }

    tryTransferItem(transferInv: Inventory, transferedIndex: number): boolean {
        const transferedItem: Item = transferInv.items[transferedIndex];
        
        if (this.tryAddItem(transferedItem)) { // ADD
            transferInv.items.splice(transferedIndex, 1); // REMOVE

            return true
        };

        return false;
    }

    loot(loot: Inventory): boolean {
        const initialLootSize = loot.items.length;
        let transferCount = 0;

        while (loot.items.length !== 0) {
            const wasItemTransfered: boolean = this.tryTransferItem(loot, 0);
            if (wasItemTransfered) {
                transferCount++;
            }
            if (!wasItemTransfered) {
                break;
            }
        }

        if (transferCount === initialLootSize) {
            return true; // All items were transfered
        }
        return false; // Some or all items were lost, due to inventory being full
    }
}
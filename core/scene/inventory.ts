import { equalsShallow } from '../../utils/utils.js';
import { Vector2 } from '../../utils/vector2.js';
import { IQuantity } from './items/i-quantity.js';
import { Item } from './items/item.js';

export class Inventory {
    items: Item[] = [];

    constructor(public size: Vector2) {
    }

    getMaxInvLength() {
        return this.size.x * this.size.y;
    }

    inventoryHasSpace() {
        if (equalsShallow(this.size, {x: 0, y: 0})) {
        // if (this.size.x === 0 && this.size.y === 0) {
            return true;
        }
        return this.items.length <= this.getMaxInvLength();
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

    tryTransferItemFrom(sourceInv: Inventory, sourceItemIndex: number): boolean {
        const transferedItem: Item = sourceInv.items[sourceItemIndex];
        
        if (this.tryAddItem(transferedItem)) { // ADD
            sourceInv.items.splice(sourceItemIndex, 1); // REMOVE

            return true
        };

        return false;
    }

    tryTransferItemFrom_HoldXp(sourceInv: Inventory, sourceItemIndex: number): { success: boolean, xp: number } {
        let xp = 0;
        const transferedItem: Item = sourceInv.items[sourceItemIndex];

        if (transferedItem.$type === 'Xp') {
            xp =+ (transferedItem as IQuantity).quantity;
            sourceInv.items.splice(sourceItemIndex, 1); // REMOVE
            
            return { success: true, xp };
        }

        if (this.tryAddItem(transferedItem)) { // ADD
            sourceInv.items.splice(sourceItemIndex, 1); // REMOVE

            return { success: true, xp };
        };

        return { success: false, xp };
    }

    loot(loot: Inventory): boolean {
        const initialLootSize = loot.items.length;
        let transferCount = 0;

        while (loot.items.length !== 0) {
            const wasItemTransfered: boolean = this.tryTransferItemFrom(loot, 0);
            if (wasItemTransfered) {
                transferCount++;
            } else {
                break;
            }
        }

        if (transferCount === initialLootSize) {
            return true; // All items were transfered
        }
        return false; // Some or all items were lost, due to inventory being full
    }
}
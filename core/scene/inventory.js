import { equalsShallow } from '../../utils/utils.js';
export class Inventory {
    size;
    items = [];
    constructor(size) {
        this.size = size;
    }
    getMaxInvLength() {
        return this.size.x * this.size.y;
    }
    inventoryHasSpace() {
        if (equalsShallow(this.size, { x: 0, y: 0 })) {
            // if (this.size.x === 0 && this.size.y === 0) {
            return true;
        }
        return this.items.length <= this.getMaxInvLength();
    }
    removeItemAt(index) {
        return this.items.splice(index, 1)[0];
    }
    tryAddItem(newItem) {
        if (!newItem)
            return false;
        const invItem = this.items.find(invItem => invItem.$displayName === newItem.$displayName);
        if (invItem && 'quantity' in newItem) {
            invItem.quantity += newItem.quantity; // Adding quantity to existing item
        }
        else if (this.inventoryHasSpace()) {
            this.items.push(newItem); // Adding new item
        }
        else {
            return false; // No space
        }
        return true;
    }
    tryTransferItemFrom(sourceInv, sourceItemIndex) {
        const transferedItem = sourceInv.items[sourceItemIndex];
        if (this.tryAddItem(transferedItem)) { // ADD
            sourceInv.items.splice(sourceItemIndex, 1); // REMOVE
            return true;
        }
        ;
        return false;
    }
    tryTransferItemFrom_HoldXp(sourceInv, sourceItemIndex) {
        let xp = 0;
        const transferedItem = sourceInv.items[sourceItemIndex];
        if (transferedItem.$type === 'Xp') {
            xp = +transferedItem.quantity;
            sourceInv.items.splice(sourceItemIndex, 1); // REMOVE
            return { success: true, xp };
        }
        if (this.tryAddItem(transferedItem)) { // ADD
            sourceInv.items.splice(sourceItemIndex, 1); // REMOVE
            return { success: true, xp };
        }
        ;
        return { success: false, xp };
    }
    loot(loot) {
        const initialLootSize = loot.items.length;
        let transferCount = 0;
        while (loot.items.length !== 0) {
            const wasItemTransfered = this.tryTransferItemFrom(loot, 0);
            if (wasItemTransfered) {
                transferCount++;
            }
            else {
                break;
            }
        }
        if (transferCount === initialLootSize) {
            return true; // All items were transfered
        }
        return false; // Some or all items were lost, due to inventory being full
    }
}

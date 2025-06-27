export class Inventory {
    size;
    items = [];
    constructor(size = null) {
        this.size = size;
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
    removeItemAt(index) {
        return this.items.splice(index, 1)[0];
    }
    tryAddItem(item) {
        const invItem = this.items.find(invItem => invItem.$displayName === item.$displayName);
        if (invItem && 'quantity' in item) {
            invItem.quantity += item.quantity;
        }
        else if (this.inventoryHasSpace()) {
            this.items.push(item);
        }
        else {
            return false;
        }
        return true;
    }
    tryTransferItem(transferInv, transferedIndex) {
        const transferedItem = transferInv.items[transferedIndex];
        if (this.tryAddItem(transferedItem)) { // ADD
            transferInv.items.splice(transferedIndex, 1); // REMOVE
            return true;
        }
        ;
        return false;
    }
    loot(loot) {
        const initialLootSize = loot.items.length;
        let transferCount = 0;
        while (loot.items.length !== 0) {
            const wasItemTransfered = this.tryTransferItem(loot, 0);
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

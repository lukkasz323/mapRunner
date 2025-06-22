export class Inventory {
    items = [];
    size = { x: 8, y: 5 };
    constructor() {
    }
    getMaxInvLength() {
        return this.size.x * this.size.y;
    }
    inventoryHasSpace() {
        return this.items.length < this.getMaxInvLength();
    }
    tryAddItem(item) {
        const invItem = this.items.find(invItem => invItem.displayName === item.displayName);
        if (invItem && "quantity" in item) {
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
            const wasTransfered = this.tryTransferItem(loot, 0);
            if (wasTransfered) {
                transferCount++;
            }
            if (!wasTransfered) {
                break;
            }
        }
        if (transferCount === initialLootSize) {
            return true; // All items were transfered
        }
        return false; // Some or all items were lost, due to inventory being full
    }
}

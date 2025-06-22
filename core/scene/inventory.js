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
    tryTransferItem(inventory, itemIndex) {
        const transferedItem = inventory.items[itemIndex];
        const invItem = this.items.find(invItem => invItem.displayName === transferedItem.displayName);
        if (invItem && "quantity" in transferedItem) {
            inventory.items.splice(itemIndex, 1)[0];
            invItem.quantity += transferedItem.quantity;
        }
        else if (this.inventoryHasSpace()) {
            inventory.items.splice(itemIndex, 1)[0];
            this.items.push(transferedItem);
        }
        else {
            return false;
        }
        return true;
    }
    loot(loot) {
        while (loot.items.length !== 0) {
            this.tryTransferItem(loot, 0);
        }
    }
}

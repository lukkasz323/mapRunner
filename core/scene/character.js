export class Character {
    name;
    level = 0;
    health = 100;
    str = 10;
    dex = 10;
    int = 10;
    inventory = [];
    constructor(name) {
        this.name = name;
    }
    loot(loot) {
        for (const item of loot) {
            if ("quantity" in item) {
                const invItemIndex = this.inventory.findIndex(invItem => invItem.displayName === item.displayName);
                if (invItemIndex !== -1) {
                    this.inventory[invItemIndex].quantity += item.quantity;
                }
                else {
                    this.inventory.push(item);
                }
            }
            else {
                this.inventory.push(item);
            }
        }
    }
}

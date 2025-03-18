import { IQuantity } from "./items/iQuantity.js";
import { Item } from "./items/item.js";

export class Character {
    level = 0;
    health = 100;
    str = 10;
    dex = 10;
    int = 10;
    inventory: Item[] = [];
    constructor(public name: string) {
    }

    loot(loot: Item[]) {
        for (const item of loot) {
            if ("quantity" in item) {
                const invItemIndex = this.inventory.findIndex(invItem => invItem.displayName === item.displayName);
                if (invItemIndex !== -1) {
                    (this.inventory[invItemIndex] as IQuantity).quantity += (item as IQuantity).quantity;
                } else {
                    this.inventory.push(item); 
                }
            } else {
                this.inventory.push(item);
            }
        }
    }
}
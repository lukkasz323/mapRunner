import { ItemType } from "./item-type.js";
import { Item } from "./item.js";
export class Xp extends Item {
    quantity;
    displayName = "XP";
    type = ItemType.Xp;
    constructor(quantity) {
        super();
        this.quantity = quantity;
    }
}

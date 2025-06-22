import { ItemType } from "./item-type.js";
import { Item } from "./item.js";
export class Gold extends Item {
    quantity;
    displayName = "Gold";
    type = ItemType.Gold;
    constructor(quantity) {
        super();
        this.quantity = quantity;
    }
}

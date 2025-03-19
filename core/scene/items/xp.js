import { Item } from "./item.js";
export class Xp extends Item {
    quantity;
    displayName = "XP";
    constructor(quantity) {
        super();
        this.quantity = quantity;
    }
}

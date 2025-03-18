import { Item } from "./item.js";
export class Gold extends Item {
    quantity;
    displayName = "Gold";
    constructor(quantity) {
        super();
        this.quantity = quantity;
    }
}

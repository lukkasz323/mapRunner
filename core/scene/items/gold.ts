import { IQuantity } from "./iQuantity.js";
import { Item } from "./item.js";

export class Gold extends Item implements IQuantity {
    displayName = "Gold";

    constructor(public quantity: number) {
        super();
    }
}
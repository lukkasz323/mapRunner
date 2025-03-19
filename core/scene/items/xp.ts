import { IQuantity } from "./iQuantity.js";
import { Item } from "./item.js";

export class Xp extends Item implements IQuantity {
    displayName = "XP";

    constructor(public quantity: number) {
        super();
    }
}
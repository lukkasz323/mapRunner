import { ItemType } from "./item-type.js";
import { Item } from "./item.js";

export class Sword extends Item {
    displayName = "Sword";
    type = ItemType.Sword;
}
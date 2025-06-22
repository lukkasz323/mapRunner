import { NOT_IMPLEMENTED } from "../constants.js";
import { Inventory } from "./inventory.js";
import { ItemType } from "./items/item-type.js";
import { Xp } from "./items/xp.js";
export class Character {
    name;
    level = 1;
    xp;
    xpRequired = 10;
    str = 10;
    dex = 10;
    int = 10;
    health = 100;
    bag = new Inventory({ x: 8, y: 8 });
    mainHand = null;
    offHand = null;
    bodyarmor = null;
    helmet = null;
    boots = null;
    gloves = null;
    belt = null;
    amulet = null;
    leftRing = null;
    rightRing = null;
    constructor(name) {
        this.name = name;
        this.xp = new Xp(0);
        this.bag.items.push(this.xp);
        this.bag;
    }
    tryLevelUp() {
        if (this.xp.quantity >= this.xpRequired) {
            this.xp.quantity -= this.xpRequired;
            this.xpRequired *= 2;
            this.level += 1;
            this.str += 1;
            this.dex += 1;
            this.int += 1;
            this.health *= 1.1;
            this.health = Math.round(this.health);
            this.tryLevelUp();
        }
    }
    unequipEquipment(itemType) {
        let item;
        switch (itemType) {
            case ItemType.Sword:
            case ItemType.Bow:
            case ItemType.Wand:
                item = this.mainHand;
                this.mainHand = null;
                break;
            case ItemType.Helmet:
                item = this.helmet;
                this.helmet = null;
                break;
            default:
                throw new Error(NOT_IMPLEMENTED);
        }
    }
    swapEquipment(bagItemIndex) {
        const bagItem = this.bag.removeItemAt(bagItemIndex);
        switch (bagItem.type) {
            case ItemType.Sword:
            case ItemType.Bow:
            case ItemType.Wand:
                if (this.mainHand) {
                    if (this.bag.tryAddItem(this.mainHand)) {
                        this.mainHand = bagItem;
                    }
                }
                break;
            case ItemType.Helmet:
                if (this.helmet) {
                    if (this.bag.tryAddItem(this.helmet)) {
                        this.helmet = bagItem;
                    }
                }
                this.helmet = null;
                break;
            default:
                throw new Error(NOT_IMPLEMENTED);
        }
    }
}

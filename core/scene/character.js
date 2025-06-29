import { Inventory } from './inventory.js';
import { EquipmentSlotByItemType } from './items/equipment-slot-by-item-type.js';
import { Xp } from './items/xp.js';
export class Character {
    name;
    level = 1;
    xp = new Xp(0);
    xpRequired = 10;
    str = 10;
    dex = 10;
    int = 10;
    health = 100;
    bag = new Inventory({ x: 8, y: 8 });
    equipment = new Map();
    // mainHand: Item = null;
    // offHand: Item = null;
    // bodyarmor: Item = null;
    // helmet: Item = null;
    // boots: Item = null;
    // gloves: Item = null;
    // belt: Item = null;
    // amulet: Item = null;
    // leftRing: Item = null;
    // rightRing: Item = null;
    constructor(name) {
        this.name = name;
        this.bag.tryAddItem(this.xp);
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
    tryUnequip(equipmentSlot) {
        if (this.bag.tryAddItem(this.equipment.get(equipmentSlot))) {
            this.equipment.set(equipmentSlot, null);
            return true; // Space available
        }
        return false; // Bag full
    }
    swapEquipment(bagItemIndex) {
        const bagItem = this.bag.items[bagItemIndex];
        if (bagItem) {
            let slot;
            // Handle multi-slots first
            if (bagItem.$type === 'Ring') {
                // If only left occupied
                if (this.equipment.get('LeftRing') && !this.equipment.get('RightRing')) {
                    slot = 'RightRing';
                }
                // If only right occupied
                else if (this.equipment.get('RightRing')) {
                    slot = 'LeftRing';
                }
                // Default if both are empty
                else {
                    slot = EquipmentSlotByItemType.get('Ring');
                }
            }
            // Else treat as a single-slot
            else {
                slot = EquipmentSlotByItemType.get(bagItem.$type);
            }
            // Swap or equip
            if (slot) {
                const equippedItem = this.equipment.get(slot);
                if (equippedItem) {
                    // Swap
                    this.bag.items.splice(bagItemIndex, 1, equippedItem);
                    this.equipment.set(slot, bagItem);
                }
                else {
                    // Just equip
                    this.equipment.set(slot, bagItem);
                    this.bag.removeItemAt(bagItemIndex);
                }
            }
        }
    }
}

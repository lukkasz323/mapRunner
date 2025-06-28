import { Inventory } from './inventory.js';
import { EquipmentSlotByItemType } from './items/equipment-slot-by-item-type.js';
import { EquipmentSlot } from './items/equipment-slot.js';
import { Item } from './items/item.js';
import { Xp } from './items/xp.js';

export class Character {
    level = 1;
    xp: Xp = new Xp(0);
    xpRequired = 10;
    str = 10;
    dex = 10;
    int = 10;
    health = 100;
    bag: Inventory = new Inventory({x: 8, y: 8});
    equipment: Map<EquipmentSlot, Item> = new Map();
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

    constructor(public name: string) {
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

    tryUnequip(equipmentSlot: EquipmentSlot): boolean {
        if (this.bag.tryAddItem(this.equipment.get(equipmentSlot))) {
            this.equipment.set(equipmentSlot, null);

            return true; // Space available
        }
        return false; // Bag full
    }

    swapEquipment(bagItemIndex: number) {
        const bagItem: Item = this.bag.items[bagItemIndex];
        if (bagItem) {
            let slot: EquipmentSlot;
            // Handle multi-slots first
            if (bagItem.$type === 'Ring') {
                // If only left occupied
                if (this.equipment.has('LeftRing') && !this.equipment.has('RightRing')) {
                    slot = 'RightRing';
                }
                // If only right occupied
                else if (this.equipment.has('RightRing')) {
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
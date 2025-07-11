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
    equipment: Map<EquipmentSlot, Item|null> = new Map();

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
        if (this.bag.tryAddItem(this.equipment.get(equipmentSlot) as Item)) {
            this.equipment.set(equipmentSlot, null);

            return true; // Space available
        }
        return false; // Bag full
    }

    swapEquipment(bagItemIndex: number) {
        const bagItem: Item = this.bag.items[bagItemIndex];
        if (bagItem) {
            let slot: EquipmentSlot|undefined;
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
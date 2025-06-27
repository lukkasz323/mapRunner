import { EquipmentSlot } from './equipment-slot.js';
import { ItemType } from './item-type.js';

export const EquipmentSlotByItemType: ReadonlyMap<ItemType, EquipmentSlot> = new Map([
    ['MainHand', 'MainHand'],
    ['OffHand', 'OffHand'],
    ['Helmet', 'Helmet'],
    ['BodyArmor', 'BodyArmor'],
    ['Boots', 'Boots'],
    ['Gloves', 'Gloves'],
    ['Belt', 'Belt'],
    ['Amulet', 'Amulet'],
    ['Ring', 'LeftRing'],
]);
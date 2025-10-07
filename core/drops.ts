import { Amulet } from "./scene/items/amulet.js";
import { Belt } from "./scene/items/belt.js";
import { Bow } from "./scene/items/bow.js";
import { Item } from "./scene/items/item.js";
import { ItemType } from "./scene/items/item-type.js";
import { MapItem } from "./scene/items/map-item.js";
import { Ring } from "./scene/items/ring.js";
import { Sword } from "./scene/items/sword.js";
import { Chainmail } from "./scene/items/chainmail.js";
import { Helmet } from "./scene/items/helmet.js";
import { Boots } from "./scene/items/boots.js";
import { Gloves } from "./scene/items/gloves.js";
import { Mod } from "./scene/items/mod.js";

export function rollMods(): Mod[] {
    const mods: Mod[] = [];

    while (Math.random() <= 0.2) {
        mods.push(new Mod());
    }
    
    return mods;
}

export function rollItem(): Item {
    const r = Math.random();
    switch (true) {
        case r > 0.1:
            return _rollGear();
        default:
            return new MapItem(1);
    }
}
        
function _rollGear(): Item {
    const r = Math.random();
    switch (true) {
        case r > 0.1:
            return _rollSimpleGear();
        default:
            return _rollAdvancedGear();
    }
}
                
function _rollSimpleGear() {
    const types: ItemType[] = ['MainHand', 'OffHand', 'BodyArmor', 'Helmet', 'Boots', 'Gloves'];
    const type = types.random();
    
    let roll: typeof Item;
    
    if (type === 'MainHand') {
        roll = [Sword, Bow].random();
    }
    else {
        roll = [Chainmail, Helmet, Boots, Gloves].random();
    }
    
    return new roll();
}

function _rollAdvancedGear(): Item {
    const roll: typeof Item = [Belt, Amulet, Ring].random();
    
    return new roll();
}
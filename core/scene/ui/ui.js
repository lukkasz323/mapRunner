import { Box } from './box.js';
export class UI {
    boxSize = 64;
    invOrigin = { x: 300, y: 208 };
    lootOrigin = { x: 280, y: 108 };
    visibleLootSize = 8;
    runMapButton = new Box({ x: 350, y: 64 }, { x: 88, y: 24 }, 'Pause Map');
    tooltipBox = new Box({ x: 30, y: 550 }, { x: 240, y: 260 }, 'Tooltip:');
    tooltipItem = null;
    generic = [];
    items = [];
    inventory = [];
    equipment = new Map();
    loot = [];
    constructor(scene) {
        this.generic.push(this.runMapButton);
        this.generic.push(this.tooltipBox);
        // Inventory
        for (let y = 0; y < scene.character.bag.size.y; y++) {
            for (let x = 0; x < scene.character.bag.size.x; x++) {
                const box = new Box({ x: this.invOrigin.x + (x * this.boxSize), y: this.invOrigin.y + (y * this.boxSize) }, { x: this.boxSize, y: this.boxSize });
                this.generic.push(box);
                this.items.push(box);
                this.inventory.push(box);
            }
        }
        // Equipment
        let x = 20;
        let y = 180;
        this.equipment.set('Helmet', new Box({ x: x += 96, y: y += 20 }, { x: 64, y: 64 })); // Helmet
        this.equipment.set('Amulet', new Box({ x: x + 80, y: y + 16 }, { x: 32, y: 32 })); // Amulet
        this.equipment.set('BodyArmor', new Box({ x: x, y: y += 96 }, { x: 64, y: 128 })); // Body armor
        this.equipment.set('MainHand', new Box({ x: x - 96, y: y - 32 }, { x: 64, y: 128 })); // Main Hand
        this.equipment.set('OffHand', new Box({ x: x + 96, y: y - 32 }, { x: 64, y: 128 })); // Off Hand
        this.equipment.set('Belt', new Box({ x: x, y: y += 160 }, { x: 64, y: 32 })); // Belt
        this.equipment.set('Gloves', new Box({ x: x - 96, y: y }, { x: 64, y: 64 })); // Gloves
        this.equipment.set('Boots', new Box({ x: x + 96, y: y }, { x: 64, y: 64 })); // Boots
        this.equipment.set('LeftRing', new Box({ x: x - 48, y: y - 48 }, { x: 32, y: 32 })); // Left Ring
        this.equipment.set('RightRing', new Box({ x: x + 80, y: y - 48 }, { x: 32, y: 32 })); // Right Ring
        for (const eqBox of this.equipment.values()) {
            this.generic.push(eqBox);
            this.items.push(eqBox);
        }
        // Loot
        for (let x = 0; x < this.visibleLootSize; x++) {
            const box = new Box({ x: this.lootOrigin.x + (x * this.boxSize), y: this.lootOrigin.y }, { x: this.boxSize, y: this.boxSize });
            this.generic.push(box);
            this.loot.push(box);
        }
    }
}

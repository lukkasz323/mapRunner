import { clamp } from '../utils/utils.js';
import { isRectCollidingWithPoint } from './collision.js';
import { Input } from './scene/input.js';
import { Item } from './scene/items/item.js';
import { MapItem } from './scene/items/map-item.js';
import { Scene } from './scene/scene.js';
import { Box } from './scene/ui/box.js';

export function updateGame(scene: Scene, input: Input, deltaTime: number): boolean {
    let loop = true;

    // Debug
    if (input.keys.get('Backquote')) {
        scene.fpsCounter.update(deltaTime);
        console.log(scene.fpsCounter.calculateAverage());
    }
    if (input.keys.get('Digit1')) scene.mapSpeed = 1;
    if (input.keys.get('Digit2')) scene.mapSpeed = 2;
    if (input.keys.get('Digit3')) scene.mapSpeed = 4;
    if (input.keys.get('Digit4')) scene.mapSpeed = 32;

    // UI
    // --- Hover
    // --- --- Tooltip
    let tooltipItem: Item|null = null;

    for (const [slot, box] of scene.ui.equipment.entries()) {
        if (isRectCollidingWithPoint(box, input.mouseOrigin)) {
            const item: Item|null = scene.character.equipment.get(slot) ?? null;
            tooltipItem = item;
            break;
        }
    }
    for (let i = 0; i < scene.ui.loot.length; i++) {
        const box: Box = scene.ui.loot[i]
        if (isRectCollidingWithPoint(box, input.mouseOrigin)) {
            const item: Item = scene.loot.items[i];
            tooltipItem = item;
            break;
        }
    }
    for (let i = 0; i < scene.ui.inventory.length; i++) {
        const box: Box = scene.ui.inventory[i]
        if (isRectCollidingWithPoint(box, input.mouseOrigin)) {
            const item: Item = scene.character.bag.items[i];
            tooltipItem = item;
            break;
        }
    }

    scene.ui.tooltipItem = tooltipItem;

    // --- Click
    if (!input.singleClickLock) {
        if (input.isMouseDownLeft) {
            // Run map button
            if (isRectCollidingWithPoint(scene.ui.runMapButton, input.mouseOrigin)) {
                scene.isMapActive = !scene.isMapActive;
                scene.ui.runMapButton.text = scene.isMapActive ? 'Pause Map' : 'Run Map';
            }

            // Loot
            for (let i = 0; i < scene.ui.loot.length; i++) {
                const box = scene.ui.loot[i];
                
                if (scene.loot.items[i] && isRectCollidingWithPoint(box, input.mouseOrigin)) {
                    scene.character.tryLootItem(scene.loot, i + scene.ui.lootScroll);
                    console.warn('Loot');
                }
                
            }
        }
        if (input.isMouseDownRight) {
            // Equipment
            // --- Equip
            for (let i = 0; i < scene.ui.inventory.length; i++) {
                const bagItemBox = scene.ui.inventory[i];
                
                if (isRectCollidingWithPoint(bagItemBox, input.mouseOrigin)) {
                    scene.character.swapEquipment(i);
                }
            }
            // --- Uneqip
            for (const [slot, box] of scene.ui.equipment.entries()) {
                if (isRectCollidingWithPoint(box, input.mouseOrigin)) {
                    scene.character.tryUnequip(slot);
                }
            }
        }
        input.singleClickLock = true;
    }

    // --- Scroll
    if (input.isWheelUp() || input.isWheelDown()) {
        if (input.isWheelUp()) {
            scene.ui.lootScroll++;
        }
        else if (input.isWheelDown()) {
            scene.ui.lootScroll--;
        }
        scene.ui.lootScroll = clamp(scene.ui.lootScroll, 0, Math.max(0, scene.loot.items.length - scene.ui.lootVisibleSize));
    }

    // Map run 
    if (scene.isMapActive) {
        scene.mapProgress += scene.mapSpeed;
    }
    if (scene.mapProgress >= 100) {
        scene.mapProgress = 0;
        
        scene.loot.loot(scene.map.run(new MapItem(1)));
        // Auto-loot XP
        const xpIndex = scene.loot.items.findIndex(item => item.$type === 'Xp')
        if (xpIndex !== -1) {
            scene.character.tryLootItem(scene.loot, xpIndex)
        }
    }

    // Frame input - reset
    input.wheelDeltaY = 0;

    // Must be last!
    scene.ticks++;
    
    if (loop) {
        return true;
    }
    return false;
}

// function updateContext(scene: Scene, context: string) {
//     switch (context) {
//         case '1':
//             break;
//         default:
//             console.error('err');
//             break;
//     }
// }
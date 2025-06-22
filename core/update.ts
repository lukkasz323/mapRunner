import { isRectCollidingWithPoint } from "./collision.js";
import { Input } from "./scene/input.js";
import { Scene } from "./scene/scene.js";

export function updateGame(scene: Scene, input: Input, canvas: HTMLCanvasElement, deltaTime: number): boolean {
    let loop = true;

    // Debug
    if (input.keys.get("Backquote")) {
        scene.fpsCounter.update(deltaTime);
        console.log(scene.fpsCounter.calculateAverage());
    }
    if (input.keys.get("Digit1")) scene.mapSpeed = 1;
    if (input.keys.get("Digit2")) scene.mapSpeed = 2;
    if (input.keys.get("Digit3")) scene.mapSpeed = 4;
    if (input.keys.get("Digit4")) scene.mapSpeed = 32;

    // UI
    if (!input.singleClickLock) {
        if (input.isMouseDownLeft) {
            // Run map button
            if (isRectCollidingWithPoint(scene.ui.runMapButton, input.mouseOrigin)) {
                scene.isMapActive = !scene.isMapActive;
                scene.ui.runMapButton.text = scene.isMapActive ? "Pause Map" : "Run Map";
            }

            // Loot
            for (let i = 0; i < scene.ui.loot.length; i++) {
                const box = scene.ui.loot[i];
                const item = scene.loot.items[i];

                if (item && isRectCollidingWithPoint(box, input.mouseOrigin)) {
                    scene.character.bag.tryTransferItem(scene.loot, i);
                    scene.character.tryLevelUp();
                }
                
            }
        }
        if (input.isMouseDownRight) {
            // Item equip
            for (let i = 0; i < scene.ui.inventory.length; i++) {
                const box = scene.ui.inventory[i];
                
                if (isRectCollidingWithPoint(box, input.mouseOrigin)) {
                    scene.character.swapEquipment(i);
                }
            }
        }
        input.singleClickLock = true;
    }

    // Map run  
    if (scene.mapProgress >= 100) {
        scene.mapProgress = 0;
        
        scene.loot.loot(scene.map.run());
    }
    if (scene.isMapActive) {
        scene.mapProgress += scene.mapSpeed;
    }

    // Must be last!
    scene.ticks++;
    
    if (loop) {
        return true;
    }
    return false;
}

// function updateContext(scene: Scene, context: string) {
//     switch (context) {
//         case "1":
//             break;
//         default:
//             console.error("err");
//             break;
//     }
// }
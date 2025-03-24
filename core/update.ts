import { Input } from "./scene/input.js";
import { Scene } from "./scene/scene.js";

export function updateGame(scene: Scene, input: Input, canvas: HTMLCanvasElement, deltaTime: number): boolean {
    let loop = true;

    // Debug
    if (input.keys.get("Backquote")) {
        scene.fpsCounter.update(deltaTime);
        console.log(scene.fpsCounter.calculateAverage());
    }

    // Input
    if (input.isMouseDown && !input.singleClickLock) {
        scene.character.loot(scene.map.run()); 
        scene.character.tryLevelUp();

        input.singleClickLock = true;
    }

    // Must be last!
    scene.ticks++;
    if (loop) {
        return true;
    }
    return false;
}
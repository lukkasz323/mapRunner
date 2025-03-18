import { Input } from "./scene/input.js";
import { Scene } from "./scene/scene.js";

export function updateGame(scene: Scene, input: Input, canvas: HTMLCanvasElement, deltaTime: number): boolean {
    let loop = true;

    // Debug
    if (input.keys.get("Backquote")) {
        scene.fpsCounter.update(deltaTime);
        console.log(scene.fpsCounter.calculateAverage());
    }

    // Must be last!
    scene.ticks++;
    if (loop) {
        return true;
    }
    return false;
}
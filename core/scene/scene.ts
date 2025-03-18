import { FPSCounter } from "../../utils/fpsCounter.js";

export class Scene {
    fpsCounter = new FPSCounter();
    ticks = 0;

    constructor(private canvas: HTMLCanvasElement) {

        console.log(this); // Debug
    }
}
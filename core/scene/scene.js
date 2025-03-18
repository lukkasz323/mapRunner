import { FPSCounter } from "../../utils/fpsCounter.js";
export class Scene {
    canvas;
    fpsCounter = new FPSCounter();
    ticks = 0;
    constructor(canvas) {
        this.canvas = canvas;
        console.log(this); // Debug
    }
}

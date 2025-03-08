import { FPSCounter } from "../../utils/fpsCounter.js";
import { directionVector2, distanceVector2, normalizeVector2, normVector2 } from "../../utils/vector2.js";
import { Camera } from "./camera.js";
import { Grid } from "./grid.js";

export class Scene {
    fpsCounter = new FPSCounter();
    ticks = 0;
    camera: Camera;

    grid = new Grid(this);

    constructor(private canvas: HTMLCanvasElement) {
        this.camera = new Camera(canvas);

        console.log(this); // Debug
    }
}
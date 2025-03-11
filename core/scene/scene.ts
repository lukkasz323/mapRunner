import { FPSCounter } from "../../utils/fpsCounter.js";
import { Camera } from "./camera.js";
import { Economy } from "./economy.js";
import { Grid } from "./grid.js";

export class Scene {
    fpsCounter = new FPSCounter();
    ticks = 0;
    camera: Camera;
    economy = new Economy();

    grid = new Grid(this);

    constructor(private canvas: HTMLCanvasElement) {
        this.camera = new Camera(canvas);

        console.log(this); // Debug
    }
}
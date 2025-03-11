import { FPSCounter } from "../../utils/fpsCounter.js";
import { Camera } from "./camera.js";
import { Economy } from "./economy.js";
import { Grid } from "./grid.js";
export class Scene {
    canvas;
    fpsCounter = new FPSCounter();
    ticks = 0;
    camera;
    economy = new Economy();
    grid = new Grid(this);
    constructor(canvas) {
        this.canvas = canvas;
        this.camera = new Camera(canvas);
        console.log(this); // Debug
    }
}

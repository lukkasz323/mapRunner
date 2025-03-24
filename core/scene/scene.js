import { FPSCounter } from "../../utils/fpsCounter.js";
import { Character } from "./character.js";
import { MapItem } from "./map.js";
import { UI } from "./ui/ui.js";
export class Scene {
    canvas;
    fpsCounter = new FPSCounter();
    ticks = 0;
    ui = new UI();
    character = new Character("Hero");
    map = new MapItem();
    mapProgress = 0;
    isMapActive = true;
    constructor(canvas) {
        this.canvas = canvas;
        console.log(this); // Debug
    }
}

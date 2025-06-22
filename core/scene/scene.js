import { FPSCounter } from "../../utils/fpsCounter.js";
import { Character } from "./character.js";
import { Inventory } from "./inventory.js";
import { MapItem } from "./map.js";
import { UI } from "./ui/ui.js";
export class Scene {
    canvas;
    fpsCounter = new FPSCounter();
    ticks = 0;
    character = new Character("Hero");
    loot = new Inventory();
    ui = new UI(this);
    map = new MapItem();
    mapProgress = 0;
    mapSpeed = 1;
    isMapActive = true;
    constructor(canvas) {
        this.canvas = canvas;
        console.log(this); // Debug
    }
}

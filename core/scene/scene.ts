import { FPSCounter } from "../../utils/fpsCounter.js";
import { Character } from "./character.js";
import { MapItem } from "./map.js";
import { UI } from "./ui/ui.js";

export class Scene {
    fpsCounter = new FPSCounter();
    ticks = 0;
    ui = new UI();
    character = new Character("Hero");
    map = new MapItem();
    mapProgress = 0;
    isMapActive = true;

    constructor(private canvas: HTMLCanvasElement) {

        console.log(this); // Debug
    }
}
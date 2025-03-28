import { FPSCounter } from "../../utils/fpsCounter.js";
import { Character } from "./character.js";
import { Item } from "./items/item.js";
import { MapItem } from "./map.js";
import { UI } from "./ui/ui.js";

export class Scene {
    fpsCounter = new FPSCounter();
    ticks = 0;
    character = new Character("Hero");
    loot: Item[] = [];
    ui = new UI(this);
    map = new MapItem();
    mapProgress = 0;
    isMapActive = true;

    constructor(private canvas: HTMLCanvasElement) {
        console.log(this); // Debug
    }
}
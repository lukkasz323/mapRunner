import { FPSCounter } from "../../utils/fpsCounter.js";
import { Character } from "./character.js";
import { MapItem } from "./map.js";
export class Scene {
    canvas;
    fpsCounter = new FPSCounter();
    ticks = 0;
    character = new Character("Hero");
    map = new MapItem();
    constructor(canvas) {
        this.canvas = canvas;
        this.character.loot(this.map.run());
        this.character.loot(this.map.run());
        this.character.loot(this.map.run());
        this.character.loot(this.map.run());
        this.character.loot(this.map.run());
        console.log(this); // Debug
    }
}

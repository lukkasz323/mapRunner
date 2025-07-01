import { FPSCounter } from '../../utils/fpsCounter.js';
import { Character } from './character.js';
import { Inventory } from './inventory.js';
import { MapItem } from './map.js';
import { UI } from './ui/ui.js';

export class Scene {
    fpsCounter = new FPSCounter();
    ticks = 0;
    character = new Character('Hero');
    loot: Inventory = new Inventory({ x: 0, y: 0});
    map = new MapItem();
    ui = new UI(this);
    mapProgress = 0;
    mapSpeed = 1;
    isMapActive = true;

    constructor(private canvas: HTMLCanvasElement) {
        console.log(this); // Debug
    }
}
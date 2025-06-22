import { Vector2 } from "../../../utils/vector2.js";
import { Scene } from "../scene.js";
import { Box } from "./box.js";

export class UI {
    boxSize = 64;
    invOrigin: Vector2 = { x: 300, y: 208 };
    lootOrigin: Vector2 = { x: 280, y: 108 };
    visibleLootSize = 8;
    runMapButton = new Box({ x: 350, y: 64 }, { x: 88, y: 24}, "Pause Map");
    boxes: Box[] = [];
    inventory: Box[] = [];
    loot: Box[] = [];

    constructor(scene: Scene) {
        this.boxes.push(this.runMapButton);

        for (let y = 0; y < scene.character.inventory.size.y; y++) {
            for (let x = 0; x < scene.character.inventory.size.x; x++) {
                this.inventory.push(new Box({ x: this.invOrigin.x + (x * this.boxSize), y: this.invOrigin.y + (y * this.boxSize) }, { x: this.boxSize, y: this.boxSize }));
            }
        }

        for (let x = 0; x < this.visibleLootSize; x++) {
            this.loot.push(new Box({ x: this.lootOrigin.x + (x * this.boxSize), y: this.lootOrigin.y }, { x: this.boxSize, y: this.boxSize }));
        }
    }
}
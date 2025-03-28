import { Vector2 } from "../../../utils/vector2.js";
import { Scene } from "../scene.js";
import { Box } from "./box.js";

export class UI {
    boxes: Box[] = [];
    inventory: Box[] = [];
    loot: Box[] = [];
    visibleLootSize = 8;
    runMapButton = new Box({ x: 350, y: 64 }, { x: 88, y: 24}, "Pause Map");

    constructor(scene: Scene) {
        this.boxes.push(this.runMapButton);

        const boxSize = 64;

        const invOrigin: Vector2 = { x: 300, y: 208 };
        for (let y = 0; y < scene.character.invSize.y; y++) {
            for (let x = 0; x < scene.character.invSize.x; x++) {
                this.inventory.push(new Box({ x: invOrigin.x + (x * boxSize), y: invOrigin.y + (y * boxSize) }, { x: boxSize, y: boxSize }));
            }
        }

        const lootOrigin: Vector2 = { x: 280, y: 108 };
        for (let x = 0; x < this.visibleLootSize; x++) {
            this.loot.push(new Box({ x: lootOrigin.x + (x * boxSize), y: lootOrigin.y }, { x: boxSize, y: boxSize }));
        }
    }
}
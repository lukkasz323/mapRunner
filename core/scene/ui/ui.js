import { Box } from "./box.js";
export class UI {
    boxes = [];
    inventory = [];
    runMapButton = new Box({ x: 350, y: 64 }, { x: 88, y: 24 }, "Pause Map");
    constructor(scene) {
        this.boxes.push(this.runMapButton);
        const invOrigin = { x: 300, y: 208 };
        const boxSize = 64;
        for (let y = 0; y < scene.character.invSize.y; y++) {
            for (let x = 0; x < scene.character.invSize.x; x++) {
                this.inventory.push(new Box({ x: invOrigin.x + (x * boxSize), y: invOrigin.y + (y * boxSize) }, { x: boxSize, y: boxSize }));
            }
        }
    }
}

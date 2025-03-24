import { Box } from "./box.js";
export class UI {
    boxes = [];
    runMapButton = new Box({ x: 128, y: 64 }, { x: 88, y: 24 }, "Pause Map");
    constructor() {
        this.boxes.push(this.runMapButton);
    }
}

import { Vector2 } from "../../utils/vector2.js";

export class Input {
    mouseOrigin: Vector2;
    //worldOrigin: Vector2;

    keys = new Map<string, boolean>();
    
    constructor(private canvas: HTMLCanvasElement) {
        this.mouseOrigin = {x: this.canvas.width / 2, y: this.canvas.height / 2};

        console.log(this);
    }

    addEventListeners() {
        this.canvas.addEventListener("mousemove", (event: PointerEvent) => this.#onMouseMove(event));
        this.canvas.addEventListener("mousedown", (event: PointerEvent) => this.#onMouseDown(event));
        this.canvas.addEventListener("mouseup", (event: PointerEvent) => this.#onMouseUp(event));
        document.addEventListener("keydown", (event: KeyboardEvent) => this.#onKeyDown(event));
        document.addEventListener("keyup", (event: KeyboardEvent) => this.#onKeyUp(event));
    }

    #onMouseMove(e: PointerEvent): void {
        const canvasBoundingClientRect: DOMRect = this.canvas.getBoundingClientRect();

        this.mouseOrigin = {
            x: Math.floor(e.x - canvasBoundingClientRect.x + 1),
            y: e.y - Math.floor(canvasBoundingClientRect.y)
        };

        // this.worldOrigin = {x: this.screenOrigin.x + this.scene.camera.origin.x, y: this.screenOrigin.y + this.scene.camera.origin.y};
    }

    #onMouseDown(e: PointerEvent) {
    }

    #onMouseUp(e: PointerEvent) {
    }

    #onKeyDown(e: KeyboardEvent) {
        this.keys.set(e.code, true);
    }

    #onKeyUp(e: KeyboardEvent) {
        this.keys.set(e.code, false);
    }
}
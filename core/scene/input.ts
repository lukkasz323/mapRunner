import { Vector2 } from '../../utils/vector2.js';

export class Input {
    mouseOrigin: Vector2;
    //worldOrigin: Vector2;

    keys = new Map<string, boolean>();
    isMouseDown = false;
    isMouseDownLeft = false;
    isMouseDownRight = false;
    singleClickLock = false;
    
    constructor(private canvas: HTMLCanvasElement) {
        this.mouseOrigin = {x: this.canvas.width / 2, y: this.canvas.height / 2};

        console.log(this);
    }

    addEventListeners() {
        this.canvas.addEventListener('mousemove', (event: MouseEvent) => this.#onMouseMove(event));
        this.canvas.addEventListener('mousedown', (event: MouseEvent) => this.#onMouseDown(event));
        this.canvas.addEventListener('mouseup', (event: MouseEvent) => this.#onMouseUp(event));
        document.addEventListener('keydown', (event: KeyboardEvent) => this.#onKeyDown(event));
        document.addEventListener('keyup', (event: KeyboardEvent) => this.#onKeyUp(event));
        this.canvas.addEventListener('contextmenu', (event: MouseEvent) => this.#onContextMenu(event));
    }

    #onMouseMove(e: MouseEvent): void {
        const canvasBoundingClientRect: DOMRect = this.canvas.getBoundingClientRect();

        this.mouseOrigin = {
            x: Math.floor(e.x - canvasBoundingClientRect.x + 1),
            y: e.y - Math.floor(canvasBoundingClientRect.y)
        };

        // this.worldOrigin = {x: this.screenOrigin.x + this.scene.camera.origin.x, y: this.screenOrigin.y + this.scene.camera.origin.y};
    }

    #onMouseDown(e: MouseEvent) {
        this.isMouseDown = true;
        if (e.button === 0) {
            this.isMouseDownLeft = true;
        }
        if (e.button === 2) {
            this.isMouseDownRight = true;
        }

        this.singleClickLock = false;
    }

    #onMouseUp(e: MouseEvent) {
        this.isMouseDown = false;
        this.isMouseDownLeft = false;
        this.isMouseDownRight = false;
    }

    #onKeyDown(e: KeyboardEvent) {
        this.keys.set(e.code, true);
    }

    #onKeyUp(e: KeyboardEvent) {
        this.keys.set(e.code, false);
    }

    #onContextMenu(e: MouseEvent) {
        e.preventDefault();
    }
}
export class Camera {
    origin = {x: 0, y: 0};
    speed = 4;

    constructor(canvas: HTMLCanvasElement) {
        this.origin = {x: canvas.width / 2, y: canvas.height / 4};
    }
}
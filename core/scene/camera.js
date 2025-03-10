export class Camera {
    origin = { x: 0, y: 0 };
    speed = 8;
    constructor(canvas) {
        this.origin = { x: canvas.width / 2, y: canvas.height / 4 };
    }
}

import { Scene } from "./scene/scene.js";
import { renderGame } from "./render.js";
import { updateGame } from "./update.js";
import { Input } from "./scene/input.js";
export class Game {
    canvas;
    scene;
    input;
    constructor(canvas) {
        this.canvas = canvas;
        this.input = new Input(canvas);
        this.scene = new Scene(canvas);
    }
    run() {
        //renderGame(this.scene, this.canvas);
        let lastDate = performance.now();
        requestAnimationFrame(() => gameLoop(this, this.scene, this.canvas, this.input));
        this.input.addEventListeners();
        function gameLoop(_this, scene, canvas, input) {
            let now = performance.now();
            let deltaTime = now - lastDate;
            lastDate = now;
            const continueGame = updateGame(scene, input, canvas, deltaTime);
            renderGame(scene, input, canvas);
            // Restart game
            if (!continueGame) {
                _this.scene = new Scene(canvas);
            }
            requestAnimationFrame(() => gameLoop(_this, _this.scene, canvas, input));
        }
    }
}

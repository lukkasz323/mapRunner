import { Scene } from "./scene/scene.js";
import { renderGame } from "./render.js";
import { updateGame } from "./update.js";
import { Input } from "./scene/input.js";

export class Game {
    scene: Scene;
    input: Input;

    constructor(public canvas: HTMLCanvasElement) {
        this.input = new Input(canvas);
        this.scene = new Scene(canvas);
    }

    run(): void {
        //renderGame(this.scene, this.canvas);
        let lastDate = performance.now();
        requestAnimationFrame(() => gameLoop(this, this.scene, this.canvas, this.input));
        this.input.addEventListeners();
        
        function gameLoop(_this: Game, scene: Scene, canvas: HTMLCanvasElement, input: Input) {
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
import { Vector2 } from "../../utils/vector2";
import { Camera } from "./camera";
import { Scene } from "./scene";

export class Tile {
    constructor(public origin: Vector2, public color: string = "gray") {
    }

    getOriginAsIsometric(): Vector2 {
        return {
            x: this.origin.x - this.origin.y,
            y: this.origin.x + this.origin.y,
        }
    }
    getOriginAsIsometricScaled(scene: Scene): Vector2 {
        const isoOrigin = this.getOriginAsIsometric();
        return {
            x: isoOrigin.x * scene.grid.tileScale.x * scene.grid.tileSize,
            y: isoOrigin.y * scene.grid.tileScale.y * scene.grid.tileSize,
        }
    }

    getOriginAsIsometricScaledAndOffsetByCamera(scene: Scene): Vector2 {
        const isoOriginScaled = this.getOriginAsIsometricScaled(scene);
        return {
            x: isoOriginScaled.x + scene.camera.origin.x,
            y: isoOriginScaled.y + scene.camera.origin.y,
        }
    }
}
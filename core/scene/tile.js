import { Biome } from "./biome";
export class Tile {
    origin;
    color;
    biome;
    constructor(origin, color = null, biome = Biome.Plains) {
        this.origin = origin;
        this.color = color;
        this.biome = biome;
    }
    getOriginAsIsometric() {
        return {
            x: this.origin.x - this.origin.y,
            y: this.origin.x + this.origin.y,
        };
    }
    getOriginAsIsometricScaled(scene) {
        const isoOrigin = this.getOriginAsIsometric();
        return {
            x: isoOrigin.x * scene.grid.tileScale.x * scene.grid.tileSize,
            y: isoOrigin.y * scene.grid.tileScale.y * scene.grid.tileSize,
        };
    }
    getOriginAsIsometricScaledAndOffsetByCamera(scene) {
        const isoOriginScaled = this.getOriginAsIsometricScaled(scene);
        return {
            x: isoOriginScaled.x + scene.camera.origin.x,
            y: isoOriginScaled.y + scene.camera.origin.y,
        };
    }
}

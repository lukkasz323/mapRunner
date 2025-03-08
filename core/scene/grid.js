import { distanceVector2 } from "../../utils/vector2.js";
import { Tile } from "./tile.js";
export class Grid {
    scene;
    width;
    height;
    tiles = [];
    hoveredTile;
    selectedTile;
    tileSize = 32;
    tileScale = { x: 2, y: 1 };
    constructor(scene, width = 5, height = 5) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        // Tiles
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.tiles.push(new Tile({ x: x, y: y }));
            }
        }
        console.log(this.tiles);
    }
    checkHoveredTile(input) {
        this.hoveredTile = this.#findClosestTile(input, this.scene);
    }
    #findClosestTile(input, scene) {
        let closestTile;
        let lowestDistance = this.tileSize * Math.max(this.tileScale.x, this.tileScale.y);
        for (const tile of this.tiles) {
            const distance = distanceVector2(tile.getOriginAsIsometricScaledAndOffsetByCamera(scene), input.mouseOrigin);
            if (distance < lowestDistance) {
                lowestDistance = distance;
                closestTile = tile;
            }
        }
        return closestTile;
    }
}

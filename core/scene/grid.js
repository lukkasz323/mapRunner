import { distanceEllipseVector2 } from "../../utils/vector2.js";
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
                let b = "Plains";
                if (y === 0)
                    b = "Ocean";
                if (y === 1)
                    b = "Coast";
                if (y === 2)
                    b = "Plains";
                if (y === 3)
                    b = "Forest";
                if (y === 4)
                    b = "Mountains";
                this.tiles.push(new Tile({ x: x, y: y }, b));
            }
        }
        console.log(this.tiles);
    }
    updateHoveredTile(input, scene) {
        let closestTile;
        let lowestDistance = this.tileSize * Math.max(this.tileScale.x, this.tileScale.y) + 1; // + 1 to avoid edge cases
        for (const tile of this.tiles) {
            // const distance = distanceVector2(tile.getOriginAsIsometricScaledAndOffsetByCamera(scene), input.mouseOrigin); // Simple
            const distance = distanceEllipseVector2(tile.getOriginAsIsometricScaledAndOffsetByCamera(scene), input.mouseOrigin, 1, 4); // Experimental (scale2 x4)
            if (distance < lowestDistance) {
                lowestDistance = distance;
                closestTile = tile;
            }
        }
        this.hoveredTile = closestTile;
    }
}

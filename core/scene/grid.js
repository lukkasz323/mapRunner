import { rngBetweenInclusive } from "../../utils/utils.js";
import { distanceEllipseVector2 } from "../../utils/vector2.js";
import { Tile } from "./tile.js";
export class Grid {
    scene;
    width;
    height;
    tiles;
    hoveredTile;
    selectedTile;
    tileSize = 32;
    tileScale = { x: 2, y: 1 };
    constructor(scene, width = 8, height = 8) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        // // Tiles
        // for (let y = 0; y < this.height; y++) {
        //     for (let x = 0; x < this.width; x++) {
        //         let b: keyof typeof BIOMES = "Plains";
        //         if(y===0)b="Ocean";
        //         if(y===1)b="Coast";
        //         if(y===2)b="Plains";
        //         if(y===3)b="Forest";
        //         if(y===4)b="Mountains";
        //         this.tiles.push(new Tile({x: x, y: y}, b));
        //     }
        // }
        this.tiles = this.generateWorld();
        console.log(this.tiles);
    }
    getTileAt(origin) {
        return this.tiles.find(tile => tile.origin.x === origin.x && tile.origin.y === origin.y);
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
    generateWorld() {
        const tiles = [];
        // Step 1 - All Ocean
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                tiles.push(new Tile({ x: x, y: y }, "Ocean"));
            }
        }
        // Step 2
        const start = { x: rngBetweenInclusive(0, this.width - 1), y: rngBetweenInclusive(0, this.height - 1) };
        // this.getTileAt(start).biome = "Plains";
        // location.reload();
        return tiles;
    }
}

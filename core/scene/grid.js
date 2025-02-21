import { Tile } from "./tile.js";
export class Grid {
    width;
    height;
    tiles = [];
    constructor(width = 5, height = 5) {
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
}

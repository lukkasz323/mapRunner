import { Tile } from "./tile.js";

export class Grid {
    tiles: Tile[] = [];

    constructor(public width: number = 5, public height: number = 5) {
        // Tiles
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.tiles.push(new Tile({x: x, y: y}));
            }
        }

        console.log(this.tiles);
    }
}
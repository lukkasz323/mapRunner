export class Economy {
    settlers = 3;
    workers = 0;
    food = 10;
    wood = 0;
    stone = 0;
    process(scene) {
        for (let i = 0; i < this.settlers; i++) {
            if (this.food > 0) {
                this.food -= 1;
            }
            else {
                this.settlers -= 1;
            }
        }
        this.food = Math.max(0, this.food);
        for (const tile of scene.grid.tiles) {
            if (tile.structure) {
                if (tile.biome === "Plains") {
                    this.wood += 2;
                }
                if (tile.biome === "Forest") {
                    this.food += 2;
                }
                if (tile.biome === "Coast") {
                    this.stone += 2;
                }
            }
        }
    }
}

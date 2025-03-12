export class Economy {
    settlers = 3;
    workers = 0;
    food = 10;
    wood = 0;
    stone = 0;
    process(scene) {
        this.food -= Math.max(0, this.settlers);
        if (this.food < 0) {
            this.settlers -= 1;
        }
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

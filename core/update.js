export function updateGame(scene, input, canvas, deltaTime) {
    let loop = true;
    // Debug
    if (input.keys.get("Backquote")) {
        scene.fpsCounter.update(deltaTime);
        console.log(scene.fpsCounter.calculateAverage());
    }
    // Input
    if (input.isMouseDown) {
        scene.character.loot(scene.map.run());
        scene.character.xp.quantity += 6;
        scene.character.tryLevelUp();
    }
    // Must be last!
    scene.ticks++;
    if (loop) {
        return true;
    }
    return false;
}

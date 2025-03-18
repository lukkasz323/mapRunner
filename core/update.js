export function updateGame(scene, input, canvas, deltaTime) {
    let loop = true;
    // Debug
    if (input.keys.get("Backquote")) {
        scene.fpsCounter.update(deltaTime);
        console.log(scene.fpsCounter.calculateAverage());
    }
    // Must be last!
    scene.ticks++;
    if (loop) {
        return true;
    }
    return false;
}

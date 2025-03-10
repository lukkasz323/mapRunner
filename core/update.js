export function updateGame(scene, input, canvas, deltaTime) {
    if (input.keys.get("Backquote")) {
        scene.fpsCounter.update(deltaTime);
        console.log(scene.fpsCounter.calculateAverage());
    }
    // Move camera
    let padding = 16;
    if (!window.navigator.userAgentData.mobile) { // Temporary
        padding = 0;
    }
    if (input.keys.get("KeyA") || input.mouseOrigin.x < padding) {
        scene.camera.origin.x += scene.camera.speed;
    }
    if (input.keys.get("KeyW") || input.mouseOrigin.y < padding) {
        scene.camera.origin.y += scene.camera.speed;
    }
    if (input.keys.get("KeyD") || input.mouseOrigin.x > canvas.width - padding) {
        scene.camera.origin.x -= scene.camera.speed;
    }
    if (input.keys.get("KeyS") || input.mouseOrigin.y > canvas.height - padding) {
        scene.camera.origin.y -= scene.camera.speed;
    }
    // Find hovered tile
    scene.grid.updateHoveredTile(input, scene);
    // Tile select
    if (input.isMouseDown && scene.grid.hoveredTile) {
        scene.grid.selectedTile = scene.grid.hoveredTile;
    }
    scene.ticks++;
}

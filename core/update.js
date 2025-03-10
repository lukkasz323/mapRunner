export function updateGame(scene, input, canvas, deltaTime) {
    if (input.keys.get("Backquote")) {
        scene.fpsCounter.update(deltaTime);
        console.log(scene.fpsCounter.calculateAverage());
    }
    // Move camera
    if (input.keys.get("KeyA") || input.mouseOrigin.x < 32) {
        scene.camera.origin.x += scene.camera.speed;
    }
    if (input.keys.get("KeyW") || input.mouseOrigin.y < 32) {
        scene.camera.origin.y += scene.camera.speed;
    }
    if (input.keys.get("KeyD") || input.mouseOrigin.x > canvas.width - 32) {
        scene.camera.origin.x -= scene.camera.speed;
    }
    if (input.keys.get("KeyS") || input.mouseOrigin.y > canvas.height - 32) {
        scene.camera.origin.y -= scene.camera.speed;
    }
    // Find hovered tile
    scene.grid.updateHoveredTile(input, scene);
    scene.ticks++;
}

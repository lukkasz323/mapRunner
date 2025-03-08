export function updateGame(scene, input, canvas, deltaTime) {
    if (input.showFPS) {
        scene.fpsCounter.update(deltaTime);
        console.log(scene.fpsCounter.calculateAverage());
    }
    // Move camera
    if (input.mouseOrigin.x < 32) {
        scene.camera.origin.x += scene.camera.speed;
    }
    if (input.mouseOrigin.y < 32) {
        scene.camera.origin.y += scene.camera.speed;
    }
    if (input.mouseOrigin.x > canvas.width - 32) {
        scene.camera.origin.x -= scene.camera.speed;
    }
    if (input.mouseOrigin.y > canvas.height - 32) {
        scene.camera.origin.y -= scene.camera.speed;
    }
    // Find hovered tile
    scene.grid.checkHoveredTile(input);
    scene.ticks++;
}

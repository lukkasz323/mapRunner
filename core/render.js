import { degreesToRadians } from "../utils/utils.js";
import { distanceEllipseVector2 } from "../utils/vector2.js";
export function renderGame(scene, input, canvas) {
    const ctx = canvas.getContext("2d");
    renderBackground(ctx, canvas);
    renderDebugGrid(ctx);
    renderGrid(ctx, scene);
    renderDebug(ctx, scene, input);
}
function renderDebug(ctx, scene, input) {
    // Mouse coordinates
    ctx.fillStyle = "black";
    ctx.fillText(input.mouseOrigin.x.toString(), 32, 32);
    ctx.fillText(input.mouseOrigin.y.toString(), 32, 64);
    // Projected tile origin coordinates 
    for (const tile of scene.grid.tiles) {
        ctx.fillStyle = "red";
        const origin = tile.getOriginAsIsometricScaledAndOffsetByCamera(scene);
        ctx.fillRect(origin.x, origin.y, 4, 4);
        // Hovered tile ellipse radius visualization
        // const r = distanceEllipseVector2(tile.getOriginAsIsometricScaledAndOffsetByCamera(scene), input.mouseOrigin, 1, 1);
        // if (r < scene.grid.tileSize * 2) {
        //     renderShape(ctx, tile.getOriginAsIsometricScaledAndOffsetByCamera(scene), r, 16, "green");
        // }
    }
    // Hovered tile ellipse radius visualization
    const tile = scene.grid.hoveredTile;
    if (tile) {
        renderShape(ctx, tile.getOriginAsIsometricScaledAndOffsetByCamera(scene), distanceEllipseVector2(tile.getOriginAsIsometricScaledAndOffsetByCamera(scene), input.mouseOrigin, 1, 1), 16, "green");
    }
}
function renderDebugGrid(ctx) {
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 0.1;
    const tileSize = 64;
    const tileWidth = tileSize;
    const tileHeight = tileSize;
    for (let y = 0; y < ctx.canvas.height / tileSize; y++) {
        for (let x = 0; x < ctx.canvas.width / tileSize; x++) {
            ctx.strokeRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
        }
    }
}
function renderBackground(ctx, canvas) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function renderGrid(ctx, scene) {
    let strokeColor = "black";
    for (const tile of scene.grid.tiles) {
        if (tile !== scene.grid.hoveredTile) {
            renderGridTile(ctx, scene, tile, strokeColor);
        }
    }
    // This is placed after the for loop to render last.
    if (scene.grid.hoveredTile) {
        strokeColor = "blue";
        renderGridTile(ctx, scene, scene.grid.hoveredTile, strokeColor);
    }
}
function renderGridTile(ctx, scene, tile, strokeColor) {
    const origin = tile.getOriginAsIsometricScaledAndOffsetByCamera(scene);
    renderShape(ctx, origin, scene.grid.tileSize, 4, strokeColor, null, 2, scene.grid.tileScale.x, scene.grid.tileScale.y, 90);
}
function renderShape(ctx, origin, radius, vertices, strokeColor = null, fillColor = null, lineWidth = 2, scaleX = 1, scaleY = 1, rotation = 0) {
    ctx.beginPath();
    const angle = Math.PI * 2 / vertices;
    const rotationRadians = degreesToRadians(rotation);
    for (let i = 0; i <= vertices; i++) {
        ctx.lineTo(origin.x + radius * Math.cos((i * angle) + rotationRadians) * scaleX, origin.y + radius * Math.sin((i * angle) + rotationRadians) * scaleY);
    }
    if (strokeColor) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    }
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
}

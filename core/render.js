import { degreesToRadians } from "../utils/utils.js";
import { FONT } from "./constants.js";
export function renderGame(scene, input, canvas) {
    const ctx = canvas.getContext("2d");
    renderBackground(ctx, canvas);
    renderXpBar(ctx, scene);
    renderStats(ctx, scene);
    renderDebug(ctx, scene, input);
}
function renderDebug(ctx, scene, input) {
    ctx.font = `16px ${FONT}`;
    // Mouse coordinates
    ctx.fillStyle = "black";
    let y = 20;
    ctx.fillText(input.mouseOrigin.x.toString(), ctx.canvas.width - 40, y += 20);
    ctx.fillText(input.mouseOrigin.y.toString(), ctx.canvas.width - 40, y += 20);
}
function renderStats(ctx, scene) {
    ctx.font = `16px ${FONT}`;
    ctx.fillStyle = "black";
    let x = 20;
    let y = 20;
    ctx.fillText(scene.character.name, x, y += 20);
    ctx.fillText(`Level: ${scene.character.level}`, x, y += 20);
    ctx.fillText(`XP: ${scene.character.xp.quantity} / ${scene.character.xpRequired}`, x, y += 20);
    ctx.fillText(`STR: ${scene.character.str}`, x, y += 20);
    ctx.fillText(`DEX: ${scene.character.dex}`, x, y += 20);
    ctx.fillText(`INT: ${scene.character.int}`, x, y += 20);
    ctx.fillText(`Health: ${scene.character.health}`, x, y += 20);
    y += 20;
    ctx.fillText(`Equipment:`, x, y += 20);
    renderRect(ctx, "gray", "black", x += 96, y += 20, 64, 64); // Helmet
    renderRect(ctx, "gray", "black", x + 80, y + 16, 32, 32); // Amulet
    renderRect(ctx, "gray", "black", x, y += 96, 64, 128); // Body armor
    renderRect(ctx, "gray", "black", x - 96, y - 32, 64, 128); // Main Hand
    renderRect(ctx, "gray", "black", x + 96, y - 32, 64, 128); // Off Hand
    renderRect(ctx, "gray", "black", x, y += 160, 64, 32); // Belt
    renderRect(ctx, "gray", "black", x - 96, y, 64, 64); // Gloves
    renderRect(ctx, "gray", "black", x + 96, y, 64, 64); // Boots
    renderRect(ctx, "gray", "black", x - 48, y - 48, 32, 32); // Left Ring
    renderRect(ctx, "gray", "black", x + 80, y - 48, 32, 32); // Left Ring
    x += 200;
    y = 180;
    ctx.fillText(`Inventory:`, x, y += 20);
    for (const item of scene.character.inventory) {
        const text = "quantity" in item ? `${item.displayName} ${item.quantity}` : item.displayName;
        ctx.fillText(text, x, y += 20);
    }
}
function renderXpBar(ctx, scene) {
    renderRect(ctx, "gray", "black", 1, 1, ctx.canvas.width - 2, 20);
    renderRect(ctx, "gold", null, 4, 4, (ctx.canvas.width - 8) * (scene.character.xp.quantity / scene.character.xpRequired), 14);
    console.log((scene.character.xp.quantity / scene.character.xpRequired));
}
function renderBackground(ctx, canvas) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function renderShape(ctx, origin, radius, vertices, strokeColor = null, fillColor = null, lineWidth = 2, scaleX = 1, scaleY = 1, rotation = 0) {
    ctx.beginPath();
    const angle = Math.PI * 2 / vertices;
    const rotationRadians = degreesToRadians(rotation);
    for (let i = 0; i <= vertices; i++) {
        ctx.lineTo(origin.x + radius * Math.cos((i * angle) + rotationRadians) * scaleX, origin.y + radius * Math.sin((i * angle) + rotationRadians) * scaleY);
    }
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    if (strokeColor) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    }
}
function renderRect(ctx, fillColor = null, strokeColor = null, x = 32, y = 32, w = 32, h = 32, lineWidth = 2) {
    let previousFillStyle;
    let previousStrokeStyle;
    if (fillColor) {
        previousFillStyle = ctx.fillStyle;
        ctx.fillStyle = fillColor;
        ctx.fillRect(x, y, w, h);
    }
    if (strokeColor) {
        previousStrokeStyle = ctx.strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor;
        ctx.strokeRect(x, y, w, h);
    }
    ctx.fillStyle = previousFillStyle;
    ctx.strokeStyle = previousStrokeStyle;
}

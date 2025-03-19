import { degreesToRadians } from "../utils/utils.js";
import { FONT } from "./constants.js";
export function renderGame(scene, input, canvas) {
    const ctx = canvas.getContext("2d");
    renderBackground(ctx, canvas);
    renderUI(ctx, scene);
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
function renderUI(ctx, scene) {
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
    x += 140;
    y = 20;
    ctx.fillText('Items:', x, y += 20);
    for (const item of scene.character.inventory) {
        const text = "quantity" in item ? `${item.displayName} ${item.quantity}` : item.displayName;
        ctx.fillText(text, x, y += 20);
    }
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
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(x, y, w, h);
    }
    if (strokeColor) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor;
        ctx.strokeRect(x, y, w, h);
    }
}

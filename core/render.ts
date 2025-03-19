import { degreesToRadians } from "../utils/utils.js";
import { Vector2 } from "../utils/vector2.js";
import { FONT } from "./constants.js";
import { Input } from "./scene/input.js";
import { Scene } from "./scene/scene.js";
import { IQuantity } from "./scene/items/iQuantity.js";

export function renderGame(scene: Scene, input: Input, canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");

    renderBackground(ctx, canvas);
    renderXpBar(ctx, scene);
    renderStats(ctx, scene);
    renderDebug(ctx, scene, input);
}

function renderDebug(ctx: CanvasRenderingContext2D, scene: Scene, input: Input) {
    ctx.font = `16px ${FONT}`;
    // Mouse coordinates
    ctx.fillStyle = "black";
    let y = 20;
    ctx.fillText(input.mouseOrigin.x.toString(), ctx.canvas.width - 40, y += 20);
    ctx.fillText(input.mouseOrigin.y.toString(), ctx.canvas.width - 40, y += 20);
}

function renderStats(ctx: CanvasRenderingContext2D, scene: Scene) {
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
    ctx.fillText('Inventory:', x, y += 20);
    for (const item of scene.character.inventory) {
        const text = "quantity" in item ? `${item.displayName} ${(item as IQuantity).quantity}` : item.displayName;
        ctx.fillText(text, x, y += 20);
    }
}

function renderXpBar(ctx: CanvasRenderingContext2D, scene: Scene) {
    renderRect(ctx, "gray", "black", 1, 1, ctx.canvas.width - 2, 20);
    renderRect(ctx, "gold", null, 4, 4, (ctx.canvas.width - 8) * (scene.character.xp.quantity / scene.character.xpRequired), 14);
    console.log((scene.character.xp.quantity / scene.character.xpRequired));
}

function renderBackground(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderShape(ctx: CanvasRenderingContext2D, origin: Vector2, radius: number, vertices: number, strokeColor: string = null, fillColor: string = null, lineWidth: number = 2, scaleX: number = 1, scaleY: number = 1, rotation: number = 0) {
    ctx.beginPath();
    const angle = Math.PI * 2 / vertices;
    const rotationRadians = degreesToRadians(rotation);
    for (let i = 0; i <= vertices; i++) {
        ctx.lineTo(
            origin.x + radius * Math.cos((i * angle) + rotationRadians) * scaleX, 
            origin.y + radius * Math.sin((i * angle) + rotationRadians) * scaleY
        );
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

function renderRect(ctx: CanvasRenderingContext2D, fillColor: string = null, strokeColor: string = null, x: number = 32, y: number = 32, w: number = 32, h: number = 32, lineWidth: number = 2) {
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
import { degreesToRadians } from "../utils/utils.js";
import { Vector2 } from "../utils/vector2.js";
import { FONT } from "./constants.js";
import { Input } from "./scene/input.js";
import { Scene } from "./scene/scene.js";
import { IQuantity } from "./scene/items/iQuantity.js";

export function renderGame(scene: Scene, input: Input, canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");

    renderBackground(ctx, canvas);
    renderUI(ctx, scene);
    renderDebug(ctx, scene, input);
}

function renderDebug(ctx: CanvasRenderingContext2D, scene: Scene, input: Input) {
    ctx.font = `16px ${FONT}`;
    // Mouse coordinates
    ctx.fillStyle = "black";
    ctx.fillText(input.mouseOrigin.x.toString(), ctx.canvas.width - 40, 20);
    ctx.fillText(input.mouseOrigin.y.toString(), ctx.canvas.width - 40, 40);
}

function renderUI(ctx: CanvasRenderingContext2D, scene: Scene) {
    ctx.font = `16px ${FONT}`;
    ctx.fillStyle = "black";
    ctx.fillText(scene.character.name, 20, 20);
    ctx.fillText(`Level: ${scene.character.level}`, 20, 40);
    ctx.fillText(`STR: ${scene.character.str}`, 20, 60);
    ctx.fillText(`DEX: ${scene.character.dex}`, 20, 80);
    ctx.fillText(`INT: ${scene.character.int}`, 20, 100);
    ctx.fillText(`Health: ${scene.character.health}`, 20, 120);
    
    ctx.fillText(`Items: `, 120, 40);
    const inv = scene.character.inventory;
    for (let i = 0; i < inv.length; i++) {
        const item = inv[i];
        
        const text = "quantity" in item ? `${item.displayName} ${(item as IQuantity).quantity}` : item.displayName;
        console.log("quantity" in item);
        ctx.fillText(text, 120, 60 + 20 * i);
    }
    console.log(1);
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
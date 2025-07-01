import { degreesToRadians } from '../utils/utils.js';
import { BLACK, FONT, FONT_SIZE } from './constants.js';
export function renderGame(scene, input, canvas) {
    const ctx = canvas.getContext('2d');
    renderBackground(ctx, canvas);
    renderUI(ctx, scene);
    renderDebug(ctx, scene, input);
}
function renderDebug(ctx, scene, input) {
    // Mouse coordinates
    let y = 20;
    renderText(ctx, input.mouseOrigin.x.toString(), ctx.canvas.width - 40, y += 20);
    renderText(ctx, input.mouseOrigin.y.toString(), ctx.canvas.width - 40, y += 20);
}
function renderUI(ctx, scene) {
    renderProgressBars(ctx, scene);
    renderStats(ctx, scene);
    // Boxes
    for (const box of scene.ui.generic) {
        renderBox(ctx, box);
    }
    // Player Inv
    for (let i = 0; i < scene.ui.inventory.length; i++) {
        const box = scene.ui.inventory[i];
        const item = scene.character.bag.items[i];
        renderItem(ctx, box, item);
    }
    // Map Loot
    for (let i = 0; i < scene.ui.visibleLootSize; i++) {
        const box = scene.ui.loot[i];
        const item = scene.loot.items[i];
        renderRect(ctx, 'gray', BLACK, box.origin.x, box.origin.y, box.size.x, box.size.y);
        if (item) {
            renderText(ctx, item.$displayName, box.origin.x + 4, box.origin.y + FONT_SIZE);
            if ('quantity' in item) {
                renderText(ctx, `${item.quantity}`, box.origin.x + 4, box.origin.y + (FONT_SIZE * 2));
            }
        }
    }
    if (scene.loot.items.length > scene.ui.visibleLootSize) {
        let x = scene.ui.lootOrigin.x + (scene.ui.boxSize * scene.ui.visibleLootSize) + 8;
        let y = scene.ui.lootOrigin.y + 8;
        renderText(ctx, '+', x, y + FONT_SIZE, BLACK, 32);
    }
    // Equipment
    let x = 20;
    let y = 180;
    renderText(ctx, `Equipment:`, x, y += 20, BLACK, FONT_SIZE, FONT);
    for (let slot of scene.ui.equipment.keys()) {
        const box = scene.ui.equipment.get(slot);
        const item = scene.character.equipment.get(slot);
        renderItem(ctx, box, item);
    }
    // Tooltip
    const tooltipBox = scene.ui.tooltipBox;
    const tooltipItem = scene.ui.tooltipItem;
    x = tooltipBox.origin.x + 10;
    y = tooltipBox.origin.y + FONT_SIZE;
    if (tooltipItem) {
        renderText(ctx, tooltipItem.$displayName, x, y += FONT_SIZE);
        renderText(ctx, tooltipItem.$type, x, y += FONT_SIZE);
        renderText(ctx, tooltipItem.id.toString(), x, y += FONT_SIZE);
    }
}
function renderLootPlus(ctx, scene) {
    ctx.strokeStyle = BLACK;
    ctx.lineWidth = 2;
    let x = scene.ui.lootOrigin.x + (scene.ui.boxSize * scene.ui.visibleLootSize) + 8;
    let y = scene.ui.lootOrigin.y + 4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 16, y);
    ctx.closePath();
    ctx.moveTo(x + 8, y - 8);
    ctx.lineTo(x + 8, y + 8);
    ctx.stroke();
}
function renderStats(ctx, scene) {
    let x = 20;
    let y = 20;
    renderText(ctx, scene.character.name, x, y += 20);
    renderText(ctx, `Level: ${scene.character.level}`, x, y += 20);
    renderText(ctx, `XP: ${scene.character.xp.quantity} / ${scene.character.xpRequired}`, x, y += 20);
    renderText(ctx, `STR: ${scene.character.str}`, x, y += 20);
    renderText(ctx, `DEX: ${scene.character.dex}`, x, y += 20);
    renderText(ctx, `INT: ${scene.character.int}`, x, y += 20);
    renderText(ctx, `Health: ${scene.character.health}`, x, y += 20);
}
function renderProgressBars(ctx, scene) {
    renderProgressBar(ctx, { x: 0, y: 0 }, { x: ctx.canvas.width, y: 20 }, scene.character.xp.quantity, scene.character.xpRequired, 'gold', 'gray'); // XP
    renderProgressBar(ctx, { x: 450, y: 66 }, { x: 256, y: 16 }, scene.mapProgress, 100, 'blue', 'gray'); // Map
}
function renderProgressBar(ctx, origin, size, current, max, colorProgress, colorBackground) {
    renderRect(ctx, colorBackground, BLACK, origin.x + 1, origin.y + 1, size.x - 2, size.y);
    renderRect(ctx, colorProgress, null, origin.x + 4, origin.y + 4, (size.x - 8) * (current / max), size.y - 6);
}
function renderBackground(ctx, canvas) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function renderItem(ctx, box, item) {
    if (item) {
        renderText(ctx, item.$displayName, box.origin.x + 4, box.origin.y + FONT_SIZE);
        // if ('quantity' in item) {
        //     renderText(ctx, `${(item as IQuantity).quantity}`, box.origin.x + 4, box.origin.y + (FONT_SIZE * 2));
        // }
        renderText(ctx, item.id.toString(), box.origin.x + 44, box.origin.y + (FONT_SIZE * 2)); // debug
    }
}
function renderBox(ctx, box) {
    renderRect(ctx, 'gray', BLACK, box.origin.x, box.origin.y, box.size.x, box.size.y);
    if (box.text) {
        renderText(ctx, box.text, box.origin.x + 4, box.origin.y + FONT_SIZE);
    }
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
    // debug TODO: simplify, remove previous
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
function renderText(ctx, text, x, y, color = BLACK, size = FONT_SIZE, font = FONT) {
    ctx.fillStyle = color;
    ctx.font = `${size}px ${font}`;
    ctx.fillText(text, x, y);
}

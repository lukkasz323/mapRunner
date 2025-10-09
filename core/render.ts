import { floatPercentageFormatted, degreesToRadians } from '../utils/utils.js';
import { sumVector2, Vector2 } from '../utils/vector2.js';
import { BLACK, CTX_FONT, FONT, FONT_SIZE } from './constants.js';
import { Input } from './scene/input.js';
import { Scene } from './scene/scene.js';
import { IQuantity } from './scene/items/i-quantity.js';
import { Box } from './scene/ui/box.js';
import { Item } from './scene/items/item.js';
import { Rarity, IRarity } from './scene/items/components/rarity.js';
import { MapItem } from './scene/items/map-item.js';

export function renderGame(scene: Scene, input: Input, canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    renderBackground(ctx, canvas);
    renderUI(ctx, scene);
    renderDebug(ctx, scene, input);
}

function renderDebug(ctx: CanvasRenderingContext2D, scene: Scene, input: Input) {
    // Mouse coordinates
    let y = 20;
    renderText(ctx, input.mouseOrigin.x.toString(), ctx.canvas.width - 40, y += 20);
    renderText(ctx, input.mouseOrigin.y.toString(), ctx.canvas.width - 40, y += 20);
}

function renderUI(ctx: CanvasRenderingContext2D, scene: Scene) {
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
    // --- Items
    const offset = scene.ui.lootScroll;
    for (let i = 0; i < scene.ui.lootVisibleSize; i++) {
        const box = scene.ui.loot[i];
        const item = scene.loot.items[i + offset];

        renderItem(ctx, box, item);
    }

    // --- Plus
    // --- --- Right
    if (scene.loot.items.length - scene.ui.lootScroll > scene.ui.lootVisibleSize) {
        let x = scene.ui.lootOrigin.x + (scene.ui.boxSize * scene.ui.lootVisibleSize) + 8;
        let y = scene.ui.lootOrigin.y + 8;
        renderText(ctx, '>', x, y + FONT_SIZE, BLACK, 32);
    }
    // --- --- Left
    if (scene.ui.lootScroll > 0) {
        let x = scene.ui.lootOrigin.x - 24;
        let y = scene.ui.lootOrigin.y + 8;
        renderText(ctx, '<', x, y + FONT_SIZE, BLACK, 32);
    }
    
    // Equipment
    let x = 20;
    let y = 180;
    renderText(ctx, `Equipment:`, x, y += 20, BLACK, FONT_SIZE, FONT);
    for (let slot of scene.ui.equipment.keys()) {
        const box = scene.ui.equipment.get(slot) as Box;
        const item = scene.character.equipment.get(slot) as Item;

        renderItem(ctx, box, item);
    }

    // Tooltip
    const tooltipBox: Box = scene.ui.tooltipBox;
    const tooltipItem: Item|null = scene.ui.tooltipItem;
    x = tooltipBox.origin.x + 10;
    y = tooltipBox.origin.y + FONT_SIZE;

    if (tooltipItem) {
        renderText(ctx, tooltipItem.$displayName, x, y += FONT_SIZE);
        renderText(ctx, `ID: ${tooltipItem.id}`, x, tooltipBox.origin.y + tooltipBox.size.y - FONT_SIZE);

        if ('getSurvivability' in tooltipItem) {
            const survivabilityText = (tooltipItem as MapItem).getSurvivability(scene.character);
            renderText(ctx, `Survivability: ${floatPercentageFormatted(survivabilityText)}`, x, y += FONT_SIZE);
        }

        if ('rarity' in tooltipItem) {
            const rarity: Rarity = (tooltipItem as IRarity).rarity;
            renderText(ctx, `Quality: ${floatPercentageFormatted(rarity.percentile)}`, x, y += FONT_SIZE);
            renderText(ctx, `Mods (${rarity.mods.length}):`, x, y += FONT_SIZE);
            for (const mod of rarity.mods) {
                renderText(ctx, `Mod!: ${mod}`, x, y += FONT_SIZE);
            }
        }
    }
}

// function renderLootPlus(ctx: CanvasRenderingContext2D, scene: Scene) {
//     ctx.strokeStyle = BLACK;
//     ctx.lineWidth = 2;

//     let x = scene.ui.lootOrigin.x + (scene.ui.boxSize * scene.ui.visibleLootSize) + 8;
//     let y = scene.ui.lootOrigin.y + 4;
//     ctx.beginPath();
//     ctx.moveTo(x, y);
//     ctx.lineTo(x + 16, y);
//     ctx.closePath();
//     ctx.moveTo(x + 8, y - 8);
//     ctx.lineTo(x + 8, y + 8);
//     ctx.stroke();
    
// }

function renderStats(ctx: CanvasRenderingContext2D, scene: Scene) {
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

function renderProgressBars(ctx: CanvasRenderingContext2D, scene: Scene) {
    renderProgressBar(ctx, {x: 0, y: 0}, {x: ctx.canvas.width, y: 20}, scene.character.xp.quantity, scene.character.xpRequired, 'gold', 'gray'); // XP
    renderProgressBar(ctx, {x: 450, y: 66}, {x: 256, y: 16}, scene.mapProgress, 100, 'blue', 'gray'); // Map
}

function renderProgressBar(ctx: CanvasRenderingContext2D, origin: Vector2, size: Vector2, current: number, max: number, colorProgress: string, colorBackground: string) {
    renderRect(ctx, colorBackground, BLACK, origin.x + 1, origin.y + 1, size.x - 2, size.y);
    renderRect(ctx, colorProgress, null, origin.x + 4, origin.y + 4, (size.x - 8) * (current / max), size.y - 6);
}

function renderBackground(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderItem(ctx: CanvasRenderingContext2D, box: Box, item: Item) {
    if (item) {
        // Text
        renderText(ctx, item.$displayName, box.origin.x + 4, box.origin.y + FONT_SIZE);
        if ('quantity' in item) {
            renderText(ctx, `${(item as IQuantity).quantity}`, box.origin.x + 4, box.origin.y + (FONT_SIZE * 2));
        }

        // Rarity color
        if ('rarity' in item) {
            const color = (item as IRarity).rarity.getColor()
            if (color !== 'gray') {
                renderRect(ctx, null, color, box.origin.x + 2, box.origin.y + 2, box.size.x - 4, box.size.y - 4);
            }
        }

        // renderText(ctx, item.id.toString(), box.origin.x + 44, box.origin.y + (FONT_SIZE * 2)); // debug, ID
    }
}

function renderBox(ctx: CanvasRenderingContext2D, box: Box) {
    renderRect(ctx, 'gray', BLACK, box.origin.x, box.origin.y, box.size.x, box.size.y);
    if (box.text) {
        renderText(ctx, box.text, box.origin.x + 4, box.origin.y + FONT_SIZE);
    }
}

function renderShape(ctx: CanvasRenderingContext2D, origin: Vector2, radius: number, vertices: number, strokeColor: string|null = null, fillColor: string|null = null, lineWidth: number = 2, scaleX: number = 1, scaleY: number = 1, rotation: number = 0) {
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

function renderRect(ctx: CanvasRenderingContext2D, fillColor: string|null = null, strokeColor: string|null = null, x: number = 32, y: number = 32, w: number = 32, h: number = 32, lineWidth: number = 2) {
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

    ctx.fillStyle = previousFillStyle as string;
    ctx.strokeStyle = previousStrokeStyle as string;
}

function renderText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string = BLACK, size: number = FONT_SIZE, font: string = FONT) {
    ctx.fillStyle = color;
    ctx.font = `${size}px ${font}`;
    ctx.fillText(text, x, y);
}
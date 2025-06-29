import { Vector2 } from '../utils/vector2';
import { Rect } from './rect.js';

export const isRectCollidingWithPoint = (rect: Rect, point: Vector2): boolean =>
    point.x >= rect.origin.x && point.x <= rect.origin.x + rect.size.x &&
    point.y >= rect.origin.y && point.y <= rect.origin.y + rect.size.y;
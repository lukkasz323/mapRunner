export const isRectCollidingWithPoint = (rect, point) => point.x >= rect.origin.x && point.x <= rect.origin.x + rect.size.x &&
    point.y >= rect.origin.y && point.y <= rect.origin.y + rect.size.y;

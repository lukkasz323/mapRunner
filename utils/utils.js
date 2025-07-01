export const DIAGONAL = 0.7071067811865475;
export function equalsShallow(a, b) {
    return Object.keys(a).every(key => a[key] === b[key]);
}
export function busy(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
export function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}
export function rngBetweenInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

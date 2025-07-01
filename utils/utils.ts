export const DIAGONAL: number = 0.7071067811865475;

export function equalsShallow<T>(a: T, b: T): boolean {
    return Object.keys(a as any).every(key => (a as any)[key] === (b as any)[key]);
}

export function busy(milliseconds: number) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}
    
export function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

export function rngBetweenInclusive(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

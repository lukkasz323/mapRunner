export class Box {
    origin;
    size;
    text;
    constructor(origin, size, text = null) {
        this.origin = origin;
        this.size = size;
        this.text = text;
    }
}

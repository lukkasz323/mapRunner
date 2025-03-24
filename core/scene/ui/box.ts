import { Vector2 } from "../../../utils/vector2.js";
import { Rect } from "../../rect.js";

export class Box implements Rect {
    constructor(public origin: Vector2, public size: Vector2, public text: string = null) {
    }
}
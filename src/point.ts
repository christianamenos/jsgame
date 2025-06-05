export default class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static clone(original: Point) {
        return new Point(original.x, original.y);
    }

    copyPosition(reference: Point) {
        this.x = reference.x;
        this.y = reference.y;
    }

    reposition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    move(xOffset: number, yOffset: number) {
        this.x += xOffset;
        this.y += yOffset;
    }

    distanceTo(other: Point) {
        return Math.hypot(this.x - other.x, this.y - other.y);
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }

    toJson() {
        return { x: this.x, y: this.y };
    }
}

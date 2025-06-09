import Point from '../shared/point.js';

export default class Line {
    private startPosition: Point;
    private endPosition: Point;
    private color: string;
    private width: number;

    constructor(start: Point, end: Point, width: number, color: string) {
        this.startPosition = start;
        this.endPosition = end;
        this.width = width;
        this.color = color;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.moveTo(this.startPosition.x, this.startPosition.y);
        ctx.lineTo(this.endPosition.x, this.endPosition.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.stroke();
        ctx.closePath();
    }
}

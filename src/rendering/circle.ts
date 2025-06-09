import Point from "../shared/point.js";

export default class Circle {
    private centerPosition: Point;
    private radius: number;
    private fillColor: string;
    private borderSize: number;
    private borderColor: string;

    constructor(centerPosition: Point, radius: number, fillColor: string, borderSize?: number, borderColor?: string) {
        this.centerPosition = centerPosition;
        this.radius = radius;
        this.fillColor = fillColor;
        this.borderSize = borderSize ?? 0;
        this.borderColor = borderColor ?? '#000';

    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.centerPosition.x, this.centerPosition.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        if (this.borderSize > 0) { // Draw external circle to create the border (outline border)
            ctx.lineWidth = this.borderSize;
            ctx.strokeStyle = this.borderColor;
            ctx.stroke();
        }
        ctx.closePath();
    }
}
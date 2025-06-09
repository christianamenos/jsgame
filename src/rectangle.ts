import Point from "./point.js";

export default class Rectangle {
    private topLeftPosition: Point;
    private width: number;
    private height: number;
    private color: string;
    private borderSize: number;
    private borderColor: string;

    constructor(position: Point, width: number, height: number, color: string, borderSize?: number, borderColor?: string) {
        this.topLeftPosition = position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.borderSize = borderSize ?? 0;
        this.borderColor = borderColor ?? '#000';
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.topLeftPosition.x, this.topLeftPosition.y, this.width, this.height);
        ctx.fill();
        /*
         * By filling before rendering the border, we are making the size of the rectangle look bigger.
         * It makes the border to be drawn in the midle of the rectangle. Therefore the size would be of:
         * width of the square + borderSize/2 (to the left side) + borderSize/2 (to the right side). In
         * some cases the border may look blurry because half a pixel can not be properly represented.
         * 
         * On the other side, if we make the fill after the stroke, it overrides part of the border.
         * Meaning that the border looks like half the specified width, but the total width of the rectangle
         * is the same: square width + borderSize (counting the half that gets added to each side).
         * 
         * Conclusion: the border works the same as the CSS outline, and in that way it's preferable
         * to fill the rectangle first, to keep consistency.
         */
        if (this.borderSize > 0) {
            ctx.lineWidth = this.borderSize;
            ctx.strokeStyle = this.borderColor;
            ctx.strokeRect(this.topLeftPosition.x, this.topLeftPosition.y, this.width, this.height);
        }
        ctx.closePath();
    }
}
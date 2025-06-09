export default interface GameObject {
    update(): void;
    render(ctx: CanvasRenderingContext2D): void;
}
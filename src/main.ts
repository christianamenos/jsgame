import Point from './shared/point.js';
import Rectangle from './rendering/rectangle.js';
import Circle from './rendering/circle.js';
import Line from './rendering/line.js';

function start() {
    console.log('Hello world');
    // Testing Point class
    const pointA = new Point(12, 15);
    pointA.move(3, 3);
    const pointB = Point.clone(pointA);
    console.log(pointB.toString());


    const canvas = (document.getElementById("game-viewport")! as HTMLCanvasElement);
    const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
    // position: Point, width: number, height: number, color: string, borderSize?: number, borderColor?: string

    const rectPosition = new Point(100, 100);
    const rect = new Rectangle(rectPosition, 100, 100, '#ff0', 10, '#00f');
    rect.render(context);

    const circlePosition = new Point(400, 100);
    const circle = new Circle(circlePosition, 10, '#ff0', 5, '#00f');
    circle.render(context);

    const lineStart = new Point(100, 100);
    const lineEnd = new Point(200, 100);
    const line = new Line(lineStart, lineEnd, 5, '#f00');
    line.render(context);
}

// Expose the function globally
(window as any).start = start;
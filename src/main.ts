import Point from './point.js';

function start() {
    console.log('Hello world');
    // Testing Point class
    const pointA = new Point(12, 15);
    pointA.move(3, 3);
    const pointB = Point.clone(pointA);
    console.log(pointB.toString());
}

// Expose the function globally
(window as any).start = start;
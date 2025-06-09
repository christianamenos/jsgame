import Point from '../../src/shared/point';

describe('Point', () => {
    it('should create a point with correct coordinates', () => {
        const point = new Point(1, 2);
        expect(point.x).toBe(1);
        expect(point.y).toBe(2);
    });

    it('should clone a point correctly', () => {
        const original = new Point(3, 4);
        const cloned = Point.clone(original);

        expect(cloned.x).toBe(3);
        expect(cloned.y).toBe(4);
        expect(cloned).not.toBe(original); // Different objects
    });

    it('should copy position from another point', () => {
        const source = new Point(5, 6);
        const target = new Point(0, 0);

        target.copyPosition(source);

        expect(target.x).toBe(5);
        expect(target.y).toBe(6);
        expect(source).not.toBe(target); // Different objects
    });

    it('should reposition to new coordinates', () => {
        const point = new Point(1, 1);

        point.reposition(7, 8);

        expect(point.x).toBe(7);
        expect(point.y).toBe(8);
    });

    it('should move by the specified offsets', () => {
        const point = new Point(10, 20);

        point.move(5, -10);

        expect(point.x).toBe(15);
        expect(point.y).toBe(10);
    });

    it('should calculate distance to another point correctly', () => {
        const pointA = new Point(0, 0);
        const pointB = new Point(3, 4);

        const distance = pointA.distanceTo(pointB);

        expect(distance).toBe(5);
    });

    it('should convert to string representation', () => {
        const point = new Point(12, 34);

        expect(point.toString()).toBe('(12, 34)');
    });

    it('should convert to JSON representation', () => {
        const point = new Point(56, 78);
        const json = point.toJson();

        expect(json).toEqual({ x: 56, y: 78 });
    });
});
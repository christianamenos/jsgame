import Point from '../src/point';

describe('Point', () => {
    it('should create a point', () => {
        const point = new Point(1, 2);
        expect(point.x).toBe(1);
        expect(point.y).toBe(2);
    });
});
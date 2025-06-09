import Circle from '../src/circle';
import Point from '../src/point';

describe('Circle', () => {
  let mockCtx: jest.Mocked<Partial<CanvasRenderingContext2D>>;

  beforeEach(() => {
    mockCtx = {
      beginPath: jest.fn(),
      closePath: jest.fn(),
      fill: jest.fn(),
      arc: jest.fn(),
      stroke: jest.fn(),
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 0
    } as jest.Mocked<Partial<CanvasRenderingContext2D>>;
  });

  it('should draw a circle without border', () => {
    const center = new Point(100, 100);
    const circle = new Circle(center, 50, '#ff0000');

    circle.draw(mockCtx as CanvasRenderingContext2D);

    expect(mockCtx.beginPath).toHaveBeenCalled();
    expect(mockCtx.arc).toHaveBeenCalledWith(100, 100, 50, 0, 2 * Math.PI);
    expect(mockCtx.fillStyle).toBe('#ff0000');
    expect(mockCtx.fill).toHaveBeenCalled();
    expect(mockCtx.stroke).not.toHaveBeenCalled(); // No border
    expect(mockCtx.closePath).toHaveBeenCalled();
  });

  it('should draw a circle with specified border and a custom border color', () => {
    const center = new Point(150, 150);
    const circle = new Circle(center, 75, '#00ff00', 3, '#0000ff');

    circle.draw(mockCtx as CanvasRenderingContext2D);

    expect(mockCtx.beginPath).toHaveBeenCalled();
    expect(mockCtx.arc).toHaveBeenCalledWith(150, 150, 75, 0, 2 * Math.PI);
    expect(mockCtx.lineWidth).toBe(3);
    expect(mockCtx.strokeStyle).toBe('#0000ff');
    expect(mockCtx.stroke).toHaveBeenCalled();
    expect(mockCtx.fillStyle).toBe('#00ff00');
    expect(mockCtx.fill).toHaveBeenCalled();
    expect(mockCtx.closePath).toHaveBeenCalled();
  });

  it('should draw a circle with specified border and the default border color', () => {
    const center = new Point(200, 200);
    const circle = new Circle(center, 100, '#ccc', 5);

    circle.draw(mockCtx as CanvasRenderingContext2D);

    expect(mockCtx.lineWidth).toBe(5);
    expect(mockCtx.strokeStyle).toBe('#000');
    expect(mockCtx.stroke).toHaveBeenCalled();
  });
});
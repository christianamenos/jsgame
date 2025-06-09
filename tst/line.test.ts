import Line from '../src/line';
import Point from '../src/point';

describe('Line', () => {
  let mockCtx: jest.Mocked<Partial<CanvasRenderingContext2D>>;

  beforeEach(() => {
    mockCtx = {
      beginPath: jest.fn(),
      closePath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      strokeStyle: '',
      lineWidth: 0
    } as jest.Mocked<Partial<CanvasRenderingContext2D>>;
  });

  it('should draw a line with the specified properties', () => {
    const start = new Point(10, 20);
    const end = new Point(30, 40);
    const line = new Line(start, end, 2, '#ff0000');

    line.draw(mockCtx as CanvasRenderingContext2D);

    expect(mockCtx.beginPath).toHaveBeenCalled();
    expect(mockCtx.moveTo).toHaveBeenCalledWith(10, 20);
    expect(mockCtx.lineTo).toHaveBeenCalledWith(30, 40);
    expect(mockCtx.strokeStyle).toBe('#ff0000');
    expect(mockCtx.lineWidth).toBe(2);
    expect(mockCtx.stroke).toHaveBeenCalled();
    expect(mockCtx.closePath).toHaveBeenCalled();
  });

  it('should draw a horizontal line correctly', () => {
    const start = new Point(50, 50);
    const end = new Point(150, 50);
    const line = new Line(start, end, 3, '#00ff00');

    line.draw(mockCtx as CanvasRenderingContext2D);

    expect(mockCtx.moveTo).toHaveBeenCalledWith(50, 50);
    expect(mockCtx.lineTo).toHaveBeenCalledWith(150, 50);
    expect(mockCtx.lineWidth).toBe(3);
    expect(mockCtx.strokeStyle).toBe('#00ff00');
  });

  it('should draw a vertical line correctly', () => {
    const start = new Point(75, 25);
    const end = new Point(75, 125);
    const line = new Line(start, end, 1, '#0000ff');

    line.draw(mockCtx as CanvasRenderingContext2D);

    expect(mockCtx.moveTo).toHaveBeenCalledWith(75, 25);
    expect(mockCtx.lineTo).toHaveBeenCalledWith(75, 125);
    expect(mockCtx.lineWidth).toBe(1);
    expect(mockCtx.strokeStyle).toBe('#0000ff');
  });
});
import Rectangle from '../../src/rendering/rectangle';
import Point from '../../src/shared/point';

describe('Rectangle', () => {
  let mockCtx: jest.Mocked<Partial<CanvasRenderingContext2D>>;

  beforeEach(() => {
    mockCtx = {
      beginPath: jest.fn(),
      closePath: jest.fn(),
      fill: jest.fn(),
      rect: jest.fn(),
      strokeRect: jest.fn(),
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 0
    } as jest.Mocked<Partial<CanvasRenderingContext2D>>;
  });

  it('should render a rectangle without border', () => {
    const position = new Point(10, 20);
    const rectangle = new Rectangle(position, 100, 50, '#ff0000');

    rectangle.render(mockCtx as CanvasRenderingContext2D);

    expect(mockCtx.beginPath).toHaveBeenCalled();
    expect(mockCtx.fillStyle).toBe('#ff0000');
    expect(mockCtx.rect).toHaveBeenCalledWith(10, 20, 100, 50);
    expect(mockCtx.fill).toHaveBeenCalled();
    expect(mockCtx.strokeRect).not.toHaveBeenCalled();
    expect(mockCtx.closePath).toHaveBeenCalled();
  });

  it('should render a rectangle with border on specific border color', () => {
    const position = new Point(5, 15);
    const rectangle = new Rectangle(position, 200, 100, '#00ff00', 2, '#0000ff');

    rectangle.render(mockCtx as CanvasRenderingContext2D);

    expect(mockCtx.beginPath).toHaveBeenCalled();
    expect(mockCtx.fillStyle).toBe('#00ff00');
    expect(mockCtx.rect).toHaveBeenCalledWith(5, 15, 200, 100);
    expect(mockCtx.fill).toHaveBeenCalled();
    expect(mockCtx.lineWidth).toBe(2);
    expect(mockCtx.strokeStyle).toBe('#0000ff');
    expect(mockCtx.strokeRect).toHaveBeenCalledWith(5, 15, 200, 100);
    expect(mockCtx.closePath).toHaveBeenCalled();
  });

  it('should render a rectangle with border and default border color', () => {
    const position = new Point(0, 0);
    const rectangle = new Rectangle(position, 50, 50, '#ccc', 3);

    rectangle.render(mockCtx as CanvasRenderingContext2D);

    expect(mockCtx.lineWidth).toBe(3);
    expect(mockCtx.strokeStyle).toBe('#000');
    expect(mockCtx.strokeRect).toHaveBeenCalledWith(0, 0, 50, 50);
  });
});
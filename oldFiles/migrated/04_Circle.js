class Circle {
  constructor(coordinate, radius) {
    this.pos = coordinate;
    this.radius = radius;
  }

  draw(context, color) {
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = color;
    context.fill();
    context.closePath();
  }
}

class Circle {
  constructor(coordinate, radius) {
    this.position = coordinate;
    this.radius = radius;
  }

  draw(context, color) {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = color;
    context.fill();
    context.closePath();
  }
}

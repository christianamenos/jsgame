class Rectangle {
  constructor(coordinates, width, height) {
    this.pos = coordinates;
    this.width = width;
    this.height = height;
  }

  draw(context, color) {
    context.beginPath();
    context.rect(this.pos.x, this.pos.y, this.width, this.height);
    context.fillStyle = color;
    context.fill();
    context.closePath();
  }
}

class Rectangle {
  constructor(coordinates, width, height) {
    this.position = coordinates;
    this.width = width;
    this.height = height;
  }

  draw(context, color) {
    context.beginPath();
    context.rect(this.position.x, this.position.y, this.width, this.height);
    context.fillStyle = color;
    context.fill();
    context.closePath();
  }
}

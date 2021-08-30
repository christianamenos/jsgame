class Coin {
  constructor(topLeftCoordinate, radius, color) {
    if (!color) {
      color = "#bb0";
    }
    this.position = topLeftCoordinate;
    this.radius = radius;
    this.color = color;
    this.boundingContainer = new BoundingCircle(this.position, this.radius*0.7);
    this.sprite = new Circle(this.position, this.radius);
  }

  draw(context) {
    this.sprite.draw(context, this.color);
  }
}

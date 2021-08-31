class Coin {
  constructor(topLeftCoord, radius, color) {
    if (!color) {
      color = "#bb0";
    }
    this.pos = topLeftCoord;
    this.radius = radius;
    this.color = color;
    this.boundBox = new BoundingCircle(this.pos, this.radius*0.7);
    this.sprite = new Circle(this.pos, this.radius);
  }

  draw(context) {
    this.sprite.draw(context, this.color);
  }
}

class Door {
  constructor(topLeftCoordinate, width, height, status) {
    if (!status) {
      // 0 => closed, 1 => open, 2 => disabled
      status = 0;
    }
    this.position = topLeftCoordinate;
    this.width = width;
    this.height = height;
    this.status = status;
    const bbPos = new Coord(this.position.x + this.width*0.45, this.position.y);
    this.boundingContainer = new BoundingBox(bbPos, this.width*0.1, this.height);
    this.sprite = new Rectangle(this.position, this.width, this.height);
  }

  draw(context) {
    let color = "#c33";
    switch (this.status) {
      case 1:
        color = "#3c3";
        break;
      case 2:
        color = "#454545";
    }
    this.sprite.draw(context, color);
  }
}
